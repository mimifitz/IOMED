import React from 'react';
import './App.css';
import DisplayCard from './DisplayCard';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      municipios: ""

    };
  }

  componentDidMount() {
    this.fetchMunicipios();

  }
  fetchMunicipios() {
    fetch(`https://www.el-tiempo.net/api/json/v2/provincias/[CODPROV]/municipios`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ municipios: response.municipios });
      });
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          El Weather
        </header>

        <div>
          <DisplayCard />
        </div>
      </div>
    );
  }
}

export default App;
