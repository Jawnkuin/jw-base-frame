import React, {PropTypes} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

const UserCardItem = ({user, onUserRolesOpenClick}) => {
  const roleChips = user.roles.map(role => (
    <Chip
      key={role.name}
      style={styles.chip}
    >
      {`${role.name} `}
    </Chip>
  ));

  return (
    <Card
      onClick={e => onUserRolesOpenClick(e, user)}
    >
      <CardHeader
        title={user.loginname}
        subtitle={user.useralias}
      />
      <CardText style={styles.wrapper}>
        {roleChips}
      </CardText>
    </Card>
  );
};

UserCardItem.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    loginname: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  onUserRolesOpenClick: PropTypes.func.isRequired
};

export default UserCardItem;
