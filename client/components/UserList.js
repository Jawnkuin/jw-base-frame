import React, {PropTypes} from 'react';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import UserCardItem from './UserCardItem';

const UserList = ({users, onUserRolesOpenClick}) => (
  <List style={{width: '100%'}}>
    <Subheader>Users</Subheader>
    {users.map(user =>
      <UserCardItem
        key={user._id}
        user={user}
        onUserRolesOpenClick={onUserRolesOpenClick}
      />
    )}
  </List>
);


UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    loginname: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(
      PropTypes.object.isRequired
    ).isRequired
  }).isRequired).isRequired,
  onUserRolesOpenClick: PropTypes.func.isRequired
};

export default UserList;
