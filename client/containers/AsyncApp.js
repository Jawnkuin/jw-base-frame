import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import {fetchRoles, fetchUsers, updateUserRoles, clickUserItem} from '../actions/user-role';
import RoleList from '../components/RoleList';
import UserList from '../components/UserList';

class AsyncApp extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    data: PropTypes.shape(
      {
        selectedUser: PropTypes.shape({
          _id: PropTypes.string.isRequired
        }).isRequired,
        users: PropTypes.array.isRequired,
        roles: PropTypes.array.isRequired
      }
    ).isRequired
  }

  constructor (props) {
    super(props);
    this.handleUserRolesOpenClick = this.handleUserRolesOpenClick.bind(this);
    this.handleRemoveUserRoleClick = this.handleRemoveUserRoleClick.bind(this);
    this.handleAddUserRoles = this.handleAddUserRoles.bind(this);
    this.handleFetchRoles = this.handleFetchRoles.bind(this);
  }

  componentDidMount () {
    const {dispatch, data} = this.props;
    if (data.users.length <= 0) {
      dispatch(fetchUsers());
    }
  }

  handleUserRolesOpenClick (e, user) {
    // e.preventDefault();

    const {dispatch} = this.props;
    dispatch(clickUserItem(user));
  }

  handleRemoveUserRoleClick (e, user, rid) {
    // e.preventDefault();
    const rids = [];
    user.roles.forEach((r) => {
      if (rid !== r._id) {
        rids.push(r._id);
      }
    });
    const {dispatch} = this.props;
    dispatch(updateUserRoles(user._id, rids));
  }

  handleAddUserRoles (user, toAddRids) {
    const {dispatch} = this.props;
    let rids = [];
    user.roles.forEach((r) => {
      rids.push(r._id);
    });
    rids = rids.concat(toAddRids);
    dispatch(updateUserRoles(user._id, rids));
  }

  handleFetchRoles () {
    const {dispatch} = this.props;
    dispatch(fetchRoles());
  }
  render () {
    const {fetching, data} = this.props;
    return (
      <div style={{display: 'flex', width: 720, flexDirection: 'row'}}>
        {fetching && <span>Fetching</span>}
        <Paper
          zDepth={1}
          style={{display: 'flex', margin: 5, flexGrow: 1, flexShrink: 1, flexBasis: 350}}
          rounded={false}
        >
          <UserList
            users={data.users}
            onUserRolesOpenClick={this.handleUserRolesOpenClick}
          />
        </Paper>
        <Paper
          zDepth={1}
          style={{display: 'flex', margin: 5, flexGrow: 1, flexShrink: 1, flexBasis: 350}}
          rounded={false}
        >
          <RoleList
            user={data.selectedUser}
            roles={data.roles}
            fetchRoles={this.handleFetchRoles}
            addUserRoles={this.handleAddUserRoles}
            onUserRoleRemoveClick={this.handleRemoveUserRoleClick}
          />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const fetching = state.fetching || false;
  const data = state.data || {
    selectedUser: {},
    users: [],
    roles: []
  };
  return {
    fetching,
    data
  };
};

export default connect(mapStateToProps)(AsyncApp);
