import React, { Component } from 'react';

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
    if(this.props.datasrc && this.props.datasrc.length < 0 ){
      fetch( "https://api.census.gov/data/timeseries/eits/eits_program_code_" + this.props.datasrc )
        .then(res => res.json())
        .then(
          (result) => {

            console.log( result );

            /*this.optionList = result.dataset.map(function(option, i){
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
