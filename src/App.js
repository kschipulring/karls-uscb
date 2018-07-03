import React, { Component } from 'react';
import MainForm from './MainForm';
import Categories from './Categories';
import DataGrids from './DataGrids';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      chosenSection: '',
      chosenCategories: [],
      startYear: null,
      endYear: null
    };
  }

  updateSection(chosenSection){
    this.setState({
      chosenSection: chosenSection
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
        <form>
          <MainForm updateSection={this.updateSection.bind(this)}
          updateStartYear={this.updateStartYear.bind(this)}
          updateEndYear={this.updateEndYear.bind(this)}>
          </MainForm>

          <Categories datasrc={this.state.chosenSection}
          updateCategories={this.updateCategories.bind(this)}></Categories>

          <DataGrids state={this.state}></DataGrids>
        </form>
      </div>
    );
  }
}

export default App;
