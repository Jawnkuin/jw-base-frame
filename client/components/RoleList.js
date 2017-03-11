import React, {PropTypes} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const RoleList = ({roles, onRoleClick}) => (
  <List>
    <Subheader>Roles</Subheader>
    {roles.map(role =>
      <ListItem
        key={role.id}
        primaryText={role.name}
        onClick={e => onRoleClick(e, role.id)}
      />
    )}
  </List>
);


RoleList.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onRoleClick: PropTypes.func.isRequired
};

export default RoleList;
