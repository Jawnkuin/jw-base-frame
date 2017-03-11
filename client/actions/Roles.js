import {fetchUsers} from './Users';

export const CLICK_ROLE = 'CLICK_ROLE';

export const clickRole = rid => dispatch => dispatch(fetchUsers(rid));
