import React, { Component } from 'react';

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

            var isMultiple = '';
            var selSize = '';

            this.optionList = reformattedArray.map(function(option, i){

              var datTitle = option.attributes.description;

              var datVal = option.attributes.value;

              if( option.attributes.description.match(/^[0-9]+/) ){
                isMultiple = 'multiple';

                selSize = reformattedArray.length;
              }

              return <option value={datVal} key={i}>{datTitle}</option>;
            });

            this.selectList = <select id="categories" name="categories"
            onChange={this.updateCategories} multiple={isMultiple} size={selSize}>
              {this.optionList}
            </select>;

            this.setState({
              error: null,
              isLoaded: true,
              items: reformattedArray
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

  updateCategories() {}

  render() {
    return (
      <section>{this.selectList}</section>
    );
  }
}

export default Categories;
