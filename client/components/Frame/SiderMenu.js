import React, {PropTypes} from 'react';
import {Menu, Icon, Tooltip} from 'antd';

const SubMenu = Menu.SubMenu;

class SiderMenu extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }
  render () {
    return (
      <Menu
        mode={this.props.name}
        defaultSelectedKeys={['sub1']}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Tooltip
                title={'用户'}
              >
                <Icon type="user" />
              </Tooltip>
              <span className="nav-text">用户</span>
            </span>
          }
        >
          <Menu.Item key="1">Tom</Menu.Item>
          <Menu.Item key="2">Bill</Menu.Item>
          <Menu.Item key="3">Alex</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Tooltip
                title={'表格'}
              >
                <Icon type="team" />
              </Tooltip>
              <span className="nav-text">表格</span>
            </span>
          }
        >
          <Menu.Item key="4">Team 1</Menu.Item>
          <Menu.Item key="5">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="6">
          <span>
            <Tooltip
              title={'文件'}
            >
              <Icon type="file" />
            </Tooltip>
            <span className="nav-text">文件</span>
          </span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default SiderMenu;
