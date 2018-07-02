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

  changeMainSector = (event) => {
    var updatedSections = Array.prototype.slice.call(event.target.selectedOptions).map(o => o.value);

    console.log( updatedSections );

    this.props.updateSections( updatedSections );
  }

  render() {
    return (
      <form>
        <select id="programCode" name="programCode" size="16" multiple onChange={this.changeMainSector}>
          {this.optionList}
        </select>
      </form>
    );
  }
}

export default MainForm;
