import { connect } from 'react-redux';
import React, { Component } from 'react';

import * as actions from '../actions';


class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  showMessage = () => <p>{this.props.message}</p>;

  render() {
    return (
      <div>
        <h1>Feature page</h1>
        {this.showMessage()}
      </div>
    );
  }
}

function mapStateToProps({ message }) {
  return { message };
}

export default connect(mapStateToProps, actions)(Feature);
