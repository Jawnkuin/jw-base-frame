import React, {PropTypes} from 'react';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import RoleCardItem from './RoleCardItem';
import AddUserRoleDialog from './AddUserRoleDialog';


const RoleList = ({user, roles,
  fetchRoles, addUserRoles, onUserRoleRemoveClick}) => {
  const addButton = user._id ? (
    <AddUserRoleDialog
      fetchRoles={fetchRoles}
      user={user}
      roles={roles}
      addUserRoles={addUserRoles}
    />
  ) : '';
  return (
    <List style={{width: '100%'}}>
      <Subheader>{`Roles of ${user.loginname}`}</Subheader>
      {addButton}
      {user.roles ? (user.roles.map(role =>
        <RoleCardItem
          key={role._id}
          role={role}
          onUserRoleRemoveClick={(e, rid) => onUserRoleRemoveClick(e, user, rid)}
        />
      )) : ''}
    </List>
  );
};

RoleList.propTypes = {
  fetchRoles: PropTypes.func.isRequired,
  addUserRoles: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    loginname: PropTypes.string.isRequired,
    roles: PropTypes.array.isRequired
  }).isRequired,
  roles: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onUserRoleRemoveClick: PropTypes.func.isRequired
};

export default RoleList;
