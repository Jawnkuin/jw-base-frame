import actionTypes from '../actions';

const immutableState = {
  fetching: false,
  user: {}
};


const userDetailReducer = (state = immutableState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_UPDATE_USER:
    case actionTypes.REQUEST_DELETE_USER:
    case actionTypes.REQUEST_USER_DETAIL:
    case actionTypes.REQUEST_ADD_USER:
      return Object.assign({}, state, {
        fetching: true
      });
    case actionTypes.RECEIVE_USER_DETAIL:
    case actionTypes.RECEIVE_ADD_USER:
    case actionTypes.RECEIVE_UPDATE_USER:
    case actionTypes.RECEIVE_DELETE_USER:
      return {
        fetching: false,
        user: action.user
      };
    default: return state;
  }
};

export default userDetailReducer;
