import React, { Component } from 'react';

import {bindActionCreators} from 'redux';

class MainForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };

    const year = (new Date()).getFullYear() - 20;
    this.years = Array.from(new Array(20),(val, index) => index + year);

    console.log('this.years = ',  this.years);
  }

  componentDidMount() {
    fetch("https://api.census.gov/data/timeseries/eits/")
      .then(res => res.json())
      .then(
        (result) => {

          this.optionList = result.dataset.map(function(option, i){
            var datTitleArr = option.title.split("-:");

            var datTitle = datTitleArr[1];

            var datVal = option.c_dataset[2];

            return <option value={datVal} key={i}>{datTitle}</option>;
          });

          this.setState({
            isLoaded: true,
            items: result.dataset
          });
        },
        // error handling
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  changeMainSections = (event) => {
    var updatedSections = Array.prototype.slice.call(event.target.selectedOptions).map(o => o.value);

    this.props.updateSections( updatedSections );
  }

  changeStartYear = (event) => {
    var updatedSections = Array.prototype.slice.call(event.target.selectedOptions).map(o => o.value);

    this.props.updateSections( updatedSections );
  }

  render() {
    return (
      <form>
        <select id="programCode" name="programCode" size="16" multiple onChange={this.changeMainSections}>
          {this.optionList}
        </select>

        <div className="form-item">
          Select a date range:<br/>
          <label className="n" htmlFor="startYear">Start:</label>

          <select name="startYear" id="startYear">
           {
             this.years.map((year, index) => {
               return <option key={`year${index}`} value={year}>{year}</option>
             })
           }
          </select>

          <label className="n" htmlFor="endYear">End:</label>

          <select name="endYear" id="endYear">
           {
             this.years.map((year, index) => {
               return <option key={`year${index}`} value={year}>{year}</option>
             })
           }
          </select>
        </div>
      </form>
    );
  }
}

export default MainForm;
