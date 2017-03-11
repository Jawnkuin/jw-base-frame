// import fetch from 'isomorphic-fetch';

// export const SELECT_USER = 'SELECT_USER';
export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const FETCH_USERS = 'FETCH_USERS';
export const CLICK_USER = 'CLICK_USER';

export const receiveUsers = users => (
  {
    type: RECEIVE_USERS,
    users
  }
);

export const requestUsers = uid => (
  {
    type: REQUEST_USERS,
    uid
  }
);

export const clickUser = user => (
  {
    type: CLICK_USER,
    roles: user.roles
  }
);

export const fetchUsers = (rid) => {
  const queryQl = rid ?
   `query={users(role:${rid}){id,name,roles{id,name}}}` : 'query={users{id,name,roles{id,name}}}';
  return (dispatch) => {
    dispatch(requestUsers(rid));
    return fetch(`/graphql?${queryQl}`)
      .then(res => res.json())
      .then((json) => {
        dispatch(receiveUsers(json.data.users));
      });
  };
};
