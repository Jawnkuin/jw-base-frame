import {combineReducers} from 'redux';
import UserRoleReducer from './UserRole';
import UserDetailReducer from './UserDetail';

const rootReducer = combineReducers({
  UserRole: UserRoleReducer,
  UserDetail: UserDetailReducer
});

export default rootReducer;
