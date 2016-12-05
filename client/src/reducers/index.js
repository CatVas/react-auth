import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './auth.reducer';
import messageReducer from './message.reducer';


const rootReducer = combineReducers({
  auth: authReducer,
  form,
  message: messageReducer,
});

export default rootReducer;
