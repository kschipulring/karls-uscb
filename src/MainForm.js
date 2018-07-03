import React, { Component } from 'react';

class MainForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };

    this.currentYear = new Date().getFullYear();
    this.startYear = this.currentYear - 20;
    this.years = Array.from(new Array(21),(val, index) => index + this.startYear);

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
            error: null,
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

  updateStartYear = (event) => {
    var year = event.target.value;

    this.props.updateStartYear( year );
  }

  updateEndYear = (event) => {
    var year = event.target.value;

    this.props.updateEndYear( year );
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

          <select name="startYear" id="startYear" onChange={this.updateStartYear}>
           {
             this.years.map((year, index) => {
               return <option key={`year${index}`} value={year}>{year}</option>
             })
           }
          </select>

          <label className="n" htmlFor="endYear">End:</label>

          <select name="endYear" id="endYear" value={this.currentYear} onChange={this.updateEndYear}>
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
