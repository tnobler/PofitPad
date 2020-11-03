import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import property from './property';

export default combineReducers({
  alert,
  auth,
  profile,
  property
});
