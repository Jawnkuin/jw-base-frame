import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as UsersActions from '../actions/Users';
import * as RolesActions from '../actions/Roles';
import RoleList from '../components/RoleList';
import UserList from '../components/UserList';

class AsyncApp extends Component {

  constructor (props) {
    super(props);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.handleRoleClick = this.handleRoleClick.bind(this);
  }

  componentDidMount () {
    const {dispatch, data} = this.props;
    if (data.users.length <= 0) {
      dispatch(UsersActions.fetchUsers());
    }
  }

  handleUserClick (e, user) {
    // e.preventDefault();

    const {dispatch} = this.props;
    dispatch(UsersActions.clickUser(user));
  }

  handleRoleClick (e, rid) {
    // e.preventDefault();

    const {dispatch} = this.props;
    dispatch(RolesActions.clickRole(rid));
  }

  render () {
    const {fetching, data} = this.props;
    return (
      <div>
        {fetching && <span>Fetching</span>}
        <UserList
          users={data.users}
          onUserClick={this.handleUserClick}
        />
        <RoleList
          roles={data.roles}
          onRoleClick={this.handleRoleClick}
        />
      </div>
    );
  }
}

AsyncApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  data: PropTypes.shape(
    {
      users: PropTypes.array.isRequired,
      roles: PropTypes.array.isRequired
    }
  ).isRequired
};

const mapStateToProps = (state) => {
  const fetching = state.fetching || false;
  const data = state.data || {
    users: [],
    roles: []
  };
  return {
    fetching,
    data
  };
};

export default connect(mapStateToProps)(AsyncApp);
