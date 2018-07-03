import React, { Component } from 'react';
import MainForm from './MainForm';
import Categories from './Categories';
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
          updateEndYear={this.updateStartYear.bind(this)}>
          </MainForm>

          <Categories datasrc={this.state.chosenSection}
          updateCategories={this.updateCategories.bind(this)}></Categories>
        </form>
      </div>
    );
  }
}

export default App;
