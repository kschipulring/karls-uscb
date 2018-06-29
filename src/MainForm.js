import React, { Component } from 'react';

class MainForm extends Component {

  componentDidMount() {
    fetch("https://api.census.gov/data/timeseries/eits/")
      .then(res => res.json())
      .then(
        (result) => {

          this.optionList = result.dataset.map(function(option){
            var datTitleArr = option.title.split("-:");

            var datTitle = datTitleArr[1];

            var datVal = option.c_dataset[2];

            return <option value={datVal}>{datTitle}</option>;
          });

          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  changeMainSector(){
    
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
