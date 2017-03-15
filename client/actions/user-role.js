import actionTypes from '../actions';


const receiveUsers = users => (
  {
    type: actionTypes.RECEIVE_FETCH_USERS,
    users
  }
);

const requestUsers = rid => (
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

const requestRoles = () => (
  {
    type: actionTypes.REQUEST_FETCH_ROLES
  }
);

const receiveRoles = roles => (
  {
    type: actionTypes.RECEIVE_FETCH_ROLES,
    roles
  }
);

export const receiveUpdateUserRole = user => (
  {
    type: actionTypes.RECEIVE_UPDATE_USER_ROLES,
    user
  }
);

export const fetchRoles = () => {
  const queryQl =
    'query={roles{_id,name,description,permissions{operation{_id,name},resourceid}}}';
  return (dispatch) => {
    dispatch(requestRoles());
    return fetch(`/graphql?${queryQl}`)
      .then(res => res.json())
      .then(json => dispatch(receiveRoles(json.data.roles))
      );
  };
};

export const fetchUsers = (rid) => {
  const queryQl = rid ?
   `query={users(role:${rid}){_id,loginname,roles{_id,name}}}` : 'query={users{_id,loginname,roles{_id,name}}}';
  return (dispatch) => {
    dispatch(requestUsers(rid));
    return fetch(`/graphql?${queryQl}`)
      .then(res => res.json())
      .then((json) => {
        dispatch(receiveUsers(json.data.users));
      });
  };
};

export const updateUserRoles = (uid, rids) => {
  const ridsStr = rids.reduce((str, rid) => `${str}"${rid}",`, '').slice(0, -1);
  const qStr = `[${ridsStr}]`;
  console.log(qStr);
  const mutationQl = `mutation{updateUserRoles(id:"${uid}",value:${qStr}){_id,loginname,roles{_id,name}}}`;
  return dispatch => (fetch('/graphql?', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({query: mutationQl, variables: null})
  })
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveUpdateUserRole(json.data.updateUserRoles));
    })
  );
};
