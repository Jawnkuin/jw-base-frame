import {Table, Tag} from 'antd';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import UpdateUserRolesModal from './UpdateUserRolesModal';
import LeftCard from '../UI/LeftColorCard';

const renderRolesTag = (roles) => {
  const color = 'blue';
  return (
    <div>
      {roles.map(r => (
        <Tag
          color={color}
          key={r._id}
        >
          {r.name}
        </Tag>
      ))}
    </div>
  );
};

const UserTable = ({userlist, rolelist, updateUserRoleFunc}) => {
  const columns = [{
    title: '登陆名',
    dataIndex: 'loginname',
    sorter: true,
    width: '20%',
    render: (text, record) => (<Link to={`user/${record._id}`}>{text}</Link>),
    key: 'loginname'
  }, {
    title: '昵称',
    dataIndex: 'useralias',
    width: '30%',
    key: 'useralias'
  }, {
    title: '角色',
    dataIndex: 'roles',
    render: roles => renderRolesTag(roles),
    width: '30%',
    key: 'roles'
  }, {
    title: '配置',
    key: 'action',
    render: (text, record) => (
      <UpdateUserRolesModal
        user={record}
        roles={rolelist}
        updateUserRoles={updateUserRoleFunc}
      />
    )
  }];
  return (
    <LeftCard>
      <Table
        columns={columns}
        rowKey={user => user._id}
        dataSource={userlist}
      />
    </LeftCard>
  );
};

UserTable.propTypes = {
  userlist: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    loginname: PropTypes.string.isRequired,
    useralias: PropTypes.string,
    roles: PropTypes.arrayOf(
      PropTypes.object
    ).isRequired
  }).isRequired).isRequired,
  rolelist: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  updateUserRoleFunc: PropTypes.func.isRequired
};

export default UserTable;
