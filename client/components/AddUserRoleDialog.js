import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

export default class AddUserRoleDialog extends Component {
  static propTypes = {
    fetchRoles: PropTypes.func.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      loginname: PropTypes.string.isRequired,
      roles: PropTypes.array.isRequired
    }).isRequired,
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    addUserRoles: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleAddRoleCheck = this.handleAddRoleCheck.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddUserRoles = this.handleAddUserRoles.bind(this);
    this.toAddRoleIdsList = [];
  }
  componentDidUpdate () {
    if (this.state.open && this.props.roles.length === 0) {
      this.props.fetchRoles();
    }
  }

  handleOpen () {
    this.setState({open: true});
  }

  handleClose () {
    this.setState({open: false});
  }

  handleAddUserRoles () {
    console.log(this.toAddRoleIdsList);
    this.props.addUserRoles(this.props.user, this.toAddRoleIdsList);
    this.handleClose();
  }

  handleAddRoleCheck (e, isCheck, rid) {
    if (isCheck) {
      this.toAddRoleIdsList.push(rid);
    } else {
      this.toAddRoleIdsList = this.toAddRoleIdsList.filter(id => id !== rid);
    }
  }

  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        secondary
        onTouchTap={this.handleAddUserRoles}
      />
    ];

    const userRoleIds = this.props.user.roles.map(r => r._id);
    return (
      <div>
        <FloatingActionButton
          mini
          onTouchTap={this.handleOpen}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title={`Add Role for ${this.props.user.loginname}`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <List>
            <Subheader>Select roles</Subheader>
            {
              this.props.roles.map(r => (
                userRoleIds.indexOf(r._id) >= 0 ? '' :
                (
                  <ListItem
                    leftCheckbox={
                      <Checkbox onCheck={(e, isCheck) => this.handleAddRoleCheck(e, isCheck, r._id)} />
                    }
                    primaryText={r.name}
                  />
                )
              ))
            }
          </List>
        </Dialog>
      </div>
    );
  }
}
