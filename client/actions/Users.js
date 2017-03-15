import actionTypes from '../actions';

export const receiveUsers = users => (
  {
    type: actionTypes.RECEIVE_FETCH_USERS,
    users
  }
);

export const requestUsers = rid => (
  {
    type: actionTypes.REQUEST_FETCH_USERS,
    rid
  }
);

export const clickUserItem = user => (
  {
    type: actionTypes.CLICK_USER_ITEM,
    user
  }
);

export const fetchUsers = (rid) => {
  const queryQl = rid ?
   `query={users(role:${rid}){_id,loginname,roles{id,name}}}` : 'query={users{_id,loginname,roles{_id,name}}}';
  return (dispatch) => {
    dispatch(requestUsers(rid));
    return fetch(`/graphql?${queryQl}`)
      .then(res => res.json())
      .then((json) => {
        dispatch(receiveUsers(json.data.users));
      });
  };
};
