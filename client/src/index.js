import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import { AUTH_USER } from './actions/types';
import Feature from './components/feature';
import Landing from './components/landing';
import reducers from './reducers';
import RequireAuth from './components/auth/require-auth';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

// If we have a token, concider the user to be signed in
if (token) {
  // Update the app state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Landing} />
        <Route path="feature" component={RequireAuth(Feature)} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
