import {
  combineReducers
} from 'redux';

import FurnitureReducer from './FurnitureReducer';
import UserReducer from './UserReducer';
import FormReducer from './FormReducer';

export default combineReducers({
  furniture: FurnitureReducer,
  user: UserReducer,
  form: FormReducer
});
