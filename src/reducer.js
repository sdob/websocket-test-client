import { combineReducers } from 'redux';

import actions from './actions/reducer';
import user from './user/reducer';

export default combineReducers({ actions, user });