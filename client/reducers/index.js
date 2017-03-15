import actionTypes from '../actions';

const immutableState = {
  fetching: false,
  data: {
    selectedUser: {},
    roles: [],
    users: []
  }
};


const rootReducer = (state = immutableState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_FETCH_USERS:
      return Object.assign({}, state, {
        fetching: true
      });
    case actionTypes.RECEIVE_FETCH_USERS:
      return {
        fetching: false,
        data: Object.assign({}, state.data, {
          users: action.users
        })
      };
    case actionTypes.CLICK_USER_ITEM:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          selectedUser: action.user
        })
      });
    case actionTypes.RECEIVE_UPDATE_USER_ROLES: {
      const newUsers = [];
      state.data.users.forEach((u) => {
        if (u._id === action.user._id) {
          newUsers.push(action.user);
        } else {
          newUsers.push(u);
        }
      });
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          selectedUser: action.user,
          users: newUsers
        })
      });
    }
    case actionTypes.RECEIVE_FETCH_ROLES:
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
