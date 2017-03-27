import actionTypes from '../actions';

export const UserFieldsUpdater = {
  useralias: 'updateUserAlias',
  tel: 'updateUserTel',
  email: 'updateUserEmail',
  password: 'updateUserPassword',
  status: 'updateUserStatus'
};

const receiveUserDetail = user => (
  {
    type: actionTypes.RECEIVE_USER_DETAIL,
    user
  }
);

const requestUserDetail = uid => (
  {
    type: actionTypes.REQUEST_USER_DETAIL,
    uid
  }
);

const receiveUpdateUser = user => (
  {
    type: actionTypes.RECEIVE_UPDATE_USER,
    user
  }
);

const receiveAddUser = user => (
  {
    type: actionTypes.RECEIVE_ADD_USER,
    user
  }
);


export const addUser = (user) => {
  const {loginname, email, password} = user;
  if (!loginname || !email || !password) {
    throw new Error('Error no user loginname or password');
  }
  const useralias = user.useralias || loginname;
  const fieldStr = `{
    loginname:"${loginname}",
    email:"${email}",
    password:"${password}",
    useralias:"${useralias}"
  }`;
  const mutationQl = `mutation={
    addUser(input: ${fieldStr}){
      _id,
      loginname,
      useralias,
      tel,
      roles,
      date,
      email
    }
  }`;
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
      dispatch(receiveAddUser(json.data.addUser));
    })
  );
};

export const fetchUserDetail = (uid) => {
  if (!uid) {
    throw new Error('Error no explicit user id in fecth user detail');
  }
  const queryQl = `query={
    user(id:"${uid}"){
      _id,
      loginname,
      useralias,
      tel,
      roles{
        _id,
        name,
        description
      },
      date,
      email
    }
  }
  `;
  return (dispatch) => {
    dispatch(requestUserDetail(uid));
    return fetch(`/graphql?${queryQl}`)
      .then(res => res.json())
      .then((json) => {
        dispatch(receiveUserDetail(json.data.user));
      });
  };
};

// kvpairs = {filed1: value1, filed2: value2}
export const updateUserDetails = (uid, kvpairs) => {
  if (!uid) {
    throw new Error('Error no explicit user id in fecth user detail');
  }
  const filedKeys = Object.keys(kvpairs);
  const fvStr = filedKeys.map(key => `{field:"${key}",value:"${kvpairs[key]}"}`).join(',');
  const mutationQl = `mutation={
    updateUserMultiFields(input: {id:${uid}, fieldvalues: [${fvStr}]}){
      _id,
      loginname,
      useralias,
      tel,
      date,
      email
    }
  }
  `;
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
      dispatch(receiveUpdateUser(json.data.updateUserMultiFields));
    })
  );
};
