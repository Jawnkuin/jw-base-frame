import * as UsersActions from '../actions/Users';

const immutableState = {
  fetching: false,
  data: {
    roles: [],
    users: []
  }
};


const rootReducer = (state = immutableState, action) => {
  switch (action.type) {
    case UsersActions.REQUEST_USERS:
      return Object.assign({}, state, {
        fetching: true
      });
    case UsersActions.RECEIVE_USERS:
      return {
        fetching: false,
        data: Object.assign({}, state.data, {
          users: action.users
        })
      };
    case UsersActions.CLICK_USER:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          roles: action.roles
        })
      });
    default:
      return state;
  }
};

export default rootReducer;
