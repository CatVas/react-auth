import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions';


class Signin extends Component {
  handleFormSubmit = ({ email, password }) => {
    // Process the signing users in
    this.props.signinUser({ email, password });
  };

  renderAlert = () => {
    const errMsg = this.props.errorMessage;

    if (errMsg) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {errMsg}
        </div>
      );
    }
  };

  render() {
    const { handleSubmit, fields: { email, password } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" type="email" {...email} />
        </fieldset>

        <fieldset className="form-group">
          <label>Password:</label>
          <input className="form-control" type="password" {...password} />
        </fieldset>

        {this.renderAlert()}

        <button className="btn btn-primary" type="submit">Sign In</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  fields: ['email', 'password'],
  form: 'signin',
}, mapStateToProps, actions)(Signin);
