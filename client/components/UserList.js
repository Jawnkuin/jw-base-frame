import React, {PropTypes} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const UserList = ({users, onUserClick}) => (
  <List>
    <Subheader>Users</Subheader>
    {users.map(user =>
      <ListItem
        key={user.id}
        primaryText={user.name}
        onClick={e => onUserClick(e, user)}
      />
    )}
  </List>
);


UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onUserClick: PropTypes.func.isRequired
};

export default UserList;
