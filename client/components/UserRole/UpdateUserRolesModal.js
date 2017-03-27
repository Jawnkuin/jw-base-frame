import React, {PropTypes} from 'react';
import {Modal, Button, Checkbox, Table} from 'antd';
import LeftCard from '../UI/LeftColorCard';


const styles = {
  modal: {
    top: 20
  }
};


class UpdateUserRolesModal extends React.Component {
  static propTypes = {
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
    updateUserRoles: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      toAddRoleIdsList: props.user.roles.map(r => r._id)
    };
    this.handleToggleRole = this.handleToggleRole.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  columns = [{
    title: '选择角色',
    dataIndex: 'name',
    width: '40px',
    render: (text, record) => (
      <Checkbox
        checked={this.state.toAddRoleIdsList.indexOf(record._id) >= 0}
        onChange={e => this.handleToggleRole(record._id, e.target.checked)}
      >
        {text}
      </Checkbox>),
    key: 'name'
  }];

  handleToggleRole (rid, isChecked) {
    let temp = Array.from(this.state.toAddRoleIdsList);
    if (isChecked) {
      temp.push(rid);
    } else {
      temp = temp.filter(id => id !== rid);
    }
    this.setState({toAddRoleIdsList: temp});
  }

  showModal () {
    this.setState({
      visible: true
    });
  }

  handleCancel () {
    this.setState({
      visible: false
    });
  }

  handleUpdate () {
    this.props.updateUserRoles(this.props.user._id, Array.from(this.state.toAddRoleIdsList));
    this.setState({
      visible: false
    });
  }
  render () {
    return (
      <div>
        <Button type="primary" icon="setting" onClick={this.showModal} />
        <Modal
          style={styles.modal}
          title={`${this.props.user.loginname}角色配置`}
          visible={this.state.visible}
          onOk={() => this.handleUpdate()}
          onCancel={() => this.handleCancel()}
        >
          <LeftCard>
            <Table
              columns={this.columns}
              rowKey={user => user._id}
              dataSource={this.props.roles}
            />
          </LeftCard>
        </Modal>
      </div>
    );
  }
}

export default UpdateUserRolesModal;
