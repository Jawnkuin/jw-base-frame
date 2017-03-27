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
