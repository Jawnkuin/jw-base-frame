import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import UserTable from './UserTable';
import {fetchUsers, updateUserRoles, fetchRoles} from '../../actions/user-role';

class UserRoleContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    data: PropTypes.shape(
      {
        users: PropTypes.array.isRequired,
        roles: PropTypes.array.isRequired
      }
    ).isRequired
  }

  constructor (props) {
    super(props);
    this.handleUpdateRoles = this.handleUpdateRoles.bind(this);
  }

  componentDidMount () {
    const {dispatch, data} = this.props;
    if (data.users.length <= 0) {
      dispatch(fetchUsers());
    }
    if (data.roles.length <= 0) {
      dispatch(fetchRoles());
    }
  }

  handleUpdateRoles (uid, toAddRids) {
    const {dispatch} = this.props;
    dispatch(updateUserRoles(uid, toAddRids));
  }

  render () {
    const {fetching, data} = this.props;
    return (
      <div>
        {fetching && (<p>loading</p>)}
        {fetching || (
          <UserTable
            userlist={data.users}
            rolelist={data.roles}
            updateUserRoleFunc={(uid, rids) => this.handleUpdateRoles(uid, rids)}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({UserRole}) => {
  const fetching = UserRole.fetching || false;
  const data = UserRole.data || {
    users: [],
    roles: []
  };
  return {
    fetching,
    data
  };
};

export default connect(mapStateToProps)(UserRoleContainer);
