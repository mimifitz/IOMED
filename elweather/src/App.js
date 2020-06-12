
import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { EuiComboBox } from '@elastic/eui';
import { EuiTitle, EuiSpacer, EuiCode } from "@elastic/eui";
import { EuiHeader } from "@elastic/eui"
import '@elastic/eui/dist/eui_theme_dark.css'
import './App.css';
import { EuiCard, EuiIcon, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';

export default () => {
    const [selectedOptions, setSelected] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [wLoading, setWLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const [data, setData] = useState([]);
    const [allOptions, setAllOptions] = useState([]);
    const [weather, setWeather] = useState({});
    const [municipios, setMunicipios] = useState({ municipios: [], isFetching: true });

    let searchTimeout;
    const onChange = selectedOptions => {
        setSelected(selectedOptions);
        console.log(selectedOptions);
    };

    const fetchMunicipios = async () => {
        try
        {
            setMunicipios({});
            setLoading(true);
            const response = await axios.get("https://www.el-tiempo.net/api/json/v2/provincias/08/municipios");
            await response.data.municipios.map(
                municipio => {
                    setMunicipios(prevMunicipios => ({ ...prevMunicipios, [municipio.NOMBRE]: municipio.COD_GEO }));
                    setAllOptions(prevAllOptions => [...prevAllOptions, { label: municipio.NOMBRE }]);
                    setData(prevData => [...prevData, response.data]);
                }
            )
            console.log(response.data)
            setLoading(false);
        } catch (error)
        {
            console.log(error);
        }
    }

    // Get weather by city id
    const getWeather = async () => {
        let municipioName = selectedOptions[0].label;
        let municipioID = municipios[municipioName]
        console.log(municipioID)



        try
        {
            setWeather({});
            setWLoading(true);
            const response = await axios.get(`https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/${municipioID}`);

            await setWeather(response.data);
            console.log(response.data);
            setWLoading(false);
        } catch (error)
        {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMunicipios();
    }, []);
    useEffect(() => {
        if (selectedOptions.length > 0) { getWeather(); }
    }, [selectedOptions]);


    const onSearchChange = useCallback(searchValue => {
        setLoading(true);
        setOptions([]);

        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            setLoading(false);
            setOptions(
                allOptions.filter(option =>
                    option.label.toLowerCase().includes(searchValue.toLowerCase())
                )
            );
        }, 1200);
    }, []);

    return (
        <React.Fragment>
            <div className="App">
                <EuiHeader className="header" position="fixed">El Weather</EuiHeader>
                <EuiTitle size="l">
                    <h1>El Weather</h1>
                </EuiTitle>
                <EuiCode language="js"></EuiCode>

                <EuiSpacer />
                <EuiSpacer />
                <EuiSpacer />
                <EuiSpacer />
                <EuiSpacer />
                <EuiSpacer />
                <EuiSpacer />
                <EuiComboBox className="search"
                    placeholder="Select your city"
                    async
                    fullWidth
                    options={allOptions}
                    selectedOptions={selectedOptions}
                    isLoading={isLoading}
                    onChange={onChange}
                    onSearchChange={onSearchChange}
                    singleSelection={{ asPlainText: true }}
                    sortMatchesBy="startsWith"
                />
                {wLoading ? <div> Weather is loading... </div> : <EuiFlexGroup gutterSize="l">
                    <EuiFlexItem>
                        <EuiCard
                            titleElement="h2"
                            textAlign="center"
                            layout="vertical"
                            icon={<EuiIcon size="xl" type={'temperature'} />}
                            title={weather.municipio.NOMBRE}
                            titleSize="s"
                            image="https://source.unsplash.com/400x200/?weather"
                            description={`Today's Temperature: ${weather.temperatura_actual} ºC` + `Rain: ${weather.lluvia} %`}


                        />
                    </EuiFlexItem>
                </EuiFlexGroup>}

            </div>
        </React.Fragment>

    );
};
