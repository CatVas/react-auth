import { connect } from 'react-redux';
import { Link } from 'react-router';
import React, { Component } from 'react';


class Header extends Component {
  renderLinks = () => {
    if (this.props.authenticated) {
      // show 'Sign Out'
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      );
    } else {
      // show 'Sing Up' & 'Sign In'
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Redux Auth</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps)(Header);
