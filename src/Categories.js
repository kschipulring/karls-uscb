import React, { Component } from 'react';

//import * from 'react-native-xml2js';

//const parseString = require('react-native-xml2js').parseString;

var XMLParser = require('react-xml-parser');


class Categories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  categoryFetch(){
    if(this.props.datasrc && this.props.datasrc.length > 0 ){

      var url = "https://api.census.gov/data/timeseries/eits/eits_program_code_" 
      + this.props.datasrc.toUpperCase() + ".xml";

      //const parseString = require('react-native-xml2js').parseString;


      fetch( url )
        .then(res => res.text())
        .then(
          (response) => {

            var xml = new XMLParser().parseFromString(response);

            var reformattedArray = xml.children.reduce((reformattedArray, member) => {
              if (member.name === "category_code") {
                reformattedArray.push(member);
              }
              return reformattedArray;
            }, []);

            console.log( xml.children );
            console.log(reformattedArray);

            /*this.optionList = reformattedArray.map(function(option, i){
              var datTitleArr = option.title.split("-:");

              var datTitle = datTitleArr[1];

              var datVal = option.c_dataset[2];

              return <option value={datVal} key={i}>{datTitle}</option>;
            });*/

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
  }

  componentDidUpdate(prevProps) {
    if (this.props.datasrc !== prevProps.datasrc) {
      this.categoryFetch();
    }
  }

  componentDidMount() {  console.log( this.props.datasrc );
    this.categoryFetch();
  }

  updateCategory() {}

  render() {
    return (
      <select id="categories" name="categories" onChange={this.updateCategory}>
        {this.optionList}
      </select>
    );
  }
}

export default Categories;
