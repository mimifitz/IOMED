
import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { EuiComboBox } from '@elastic/eui';
import DisplayCards from './DisplayCard';
import { EuiTitle, EuiSpacer, EuiCode } from "@elastic/eui";
import { EuiHeader } from "@elastic/eui"
import '@elastic/eui/dist/eui_theme_light.css'
import './App.css';

export default () => {
    const [selectedOptions, setSelected] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [options, setOptions] = useState([{ label: "Abrera" }]);
    const [allOptions, setAllOptions] = useState([]);
    const [municipios, setMunicipios] = useState({});
    // const [citiesData, setCitiesData] = useState({ cities: [], isFetching: false });

    let searchTimeout;
    const onChange = selectedOptions => {
        setSelected(selectedOptions);
    };

    const fetchMunicipios = async () => {
        try
        {
            setMunicipios({});
            setLoading(true);
            const response = await axios.get("https://www.el-tiempo.net/api/json/v2/provincias/08/municipios");
            await response.data.municipios.map(
                municipio => {
                    setMunicipios(prevMunicipios => ({ ...prevMunicipios, [municipio.NOMBRE]: municipio.CODIGOINE }));
                    setAllOptions(prevAllOptions => [...prevAllOptions, { label: municipio.NOMBRE }]);
                    setOptions(prevOptions => [...prevOptions, { label: municipio.NOMBRE }]);
                }
            )

            setLoading(false);
        } catch (error)
        {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMunicipios();
    }, []);

    const onSearchChange = useCallback(searchValue => {
        setLoading(true);
        setOptions([]);

        clearTimeout(searchTimeout);

        // eslint-disable-next-line react-hooks/exhaustive-deps
        searchTimeout = setTimeout(() => {
            // Simulate a remotely-executed search.
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
            <EuiHeader position="fixed" theme="dark">El Weather</EuiHeader>
            <EuiTitle size="l">
                <h1>El Weather</h1>
            </EuiTitle>
            <EuiCode language="js"></EuiCode>

            <EuiSpacer />
            <EuiComboBox
                placeholder="Type your City"
                async
                options={options}
                selectedOptions={selectedOptions}
                isLoading={isLoading}
                onChange={onChange}
                onSearchChange={onSearchChange}
            />
            {/* <DisplayCards /> */}
        </React.Fragment>

    );
};
