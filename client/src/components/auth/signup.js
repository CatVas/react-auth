import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions';


class Signup extends Component {
  handleFormSubmit = (formProps) => {
    this.props.signupUser(formProps);
  };

  renderAlert = () => {
    const { errorMsg } = this.props;

    if (errorMsg) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {errorMsg}
        </div>
      );
    }
  };

  render() {
    const {
      fields: { email, password, passwordConfirm },
      handleSubmit,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>E-mail:</label>
          <input type="email" className="form-control" {...email} />
          {
            email.error
            && email.touched
            && <div className="error">{email.error}</div>
          }
        </fieldset>

        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" {...password} />
          {
            password.error
            && password.touched
            && <div className="error">{password.error}</div>
          }
        </fieldset>

        <fieldset className="form-group">
          <label>Confirm password:</label>
          <input type="password" className="form-control" {...passwordConfirm} />
          {
            passwordConfirm.error
            && passwordConfirm.touched
            && <div className="error">{passwordConfirm.error}</div>
          }
        </fieldset>

        {this.renderAlert()}

        <button className="btn btn-primary" type="submit">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};
  const { email, password, passwordConfirm } = formProps;

  if (!email) {
    errors.email = 'Please enter an email';
  }
  if (!password) {
    errors.password = 'Please enter a password';
  }
  if (!passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMsg: state.auth.error };
}

export default reduxForm({
  fields: ['email', 'password', 'passwordConfirm'],
  form: 'signup',
  validate,
}, mapStateToProps, actions)(Signup);
