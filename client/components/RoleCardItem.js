import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  card: {
    display: 'flex',
    margin: 3,
    flexDirection: 'row',
    flex: 1
  },
  label: {
    alignSelf: 'flex-start'
  },
  button: {
    alignSelf: 'flex-end'
  }
};


const RoleCardItem = ({role, onUserRoleRemoveClick}) => (
  <div style={styles.card}>
    <p style={styles.label}>
      {`${role.name} `}
    </p>
    <RaisedButton
      label="remove"
      style={styles.button}
      secondary
      onClick={e => onUserRoleRemoveClick(e, role._id)}
    />
  </div>
);


RoleCardItem.propTypes = {
  role: PropTypes.shape({
    name: PropTypes.string.isRequired,
    permissions: PropTypes.array.isRequired
  }).isRequired,
  onUserRoleRemoveClick: PropTypes.func.isRequired
};

export default RoleCardItem;
