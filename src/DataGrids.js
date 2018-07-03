import React, { Component } from 'react';

class DataGrids extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.datasrc !== prevProps.datasrc) {
      //this.categoryFetch();
    }

    console.log( "this.props = ", this.props );
  }

	constructor(props) {
		super(props);
		
		console.log( "props = ", props );
	}

	render() {
		return '';
	}
}

export default DataGrids;