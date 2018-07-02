import React, { Component } from 'react';
import MainForm from './MainForm';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      chosenSections: [],
      chosenCategories: [],
      startYear: null,
      endYear: null
    };
  }

  updateSections(chosenSections){
    this.setState({
      chosenSections: chosenSections
    });
  }

  updateCategories(chosenCategories){
    this.setState({
      chosenCategories: chosenCategories
    });
  }

  updateStartYear(startYear){
    this.setState({
      startYear: startYear
    });
  }

  updateEndYear(endYear){
    this.setState({
      endYear: endYear
    });
  }

  render() {
    return (
      <div className="App">
        <MainForm updateSections={this.updateSections.bind(this)}
        updateStartYear={this.updateStartYear.bind(this)}
        updateEndYear={this.updateStartYear.bind(this)}>
        </MainForm>
      </div>
    );
  }
}

export default App;
