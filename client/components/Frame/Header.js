import React from 'react';
import {Icon, Dropdown, Menu} from 'antd';

const styles = {
  headerContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#fff'
  },
  h1: {
    fontSize: 36,
    display: 'inline',
    fontWeight: 0
  },
  user: {
    color: '#fff'
  },
  userMenu: {
    fontSize: 14
  }
};

const userMenu = (
  <Menu style={styles.userMenu}>
    <Menu.Item>
      <a
        rel="noopener noreferrer"
      >
        <Icon type="home" /> 主页
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        rel="noopener noreferrer"
      >
        <Icon type="logout" /> 退出
      </a>
    </Menu.Item>
  </Menu>
);

class MyHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      drawerWidth: '200',
      open: true
    };
  }
  render () {
    return (
      <div style={styles.headerContent}>
        <h1 style={styles.h1}>用户权限管理系统</h1>
        <Dropdown overlay={userMenu}>
          <a className="ant-dropdown-link" style={styles.user}>
            <Icon type="user" /> <span>管理员</span>
          </a>
        </Dropdown>
      </div>
    );
  }
}

export default MyHeader;
