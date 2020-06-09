import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      municipio=""

    };
  }

  componentDidMount() {
    this.municipio();

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          El Weather
        </header>
      </div>
    );
  }
}

export default App;
