import React, {PropTypes} from 'react';
import {Layout, Breadcrumb} from 'antd';
import MyHeader from './Header';
import SiderMenu from './SiderMenu';

const {Header, Content, Sider} = Layout;

const styles = {
  main: {
    height: '100%',
    width: '100%',
    fontSize: 16,
    margin: 0
  },
  content: {
    height: '100%',
    width: '100%'
  },
  layout: {
    height: '100%',
    width: '100%',
    margin: 0
  },
  inlayout: {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 24
  },
  Breadcrumb: {
    padding: 12
  },
  header: {
    backgroundColor: '#2950c2',
    height: 72
  },
  h1: {
    color: '#fff'
  },
  sider: {
    backgroundColor: '#fff'
  },
  card: {
    height: '100%',
    width: '100%',
    borderLeftWidth: 4,
    borderLeftStyle: 'solid',
    borderLeftColor: '#108ee9'
  }
};

class Frame extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  constructor (props) {
    super(props);
    this.state = {
      collapsed: false,
      mode: 'inline'
    };
    this.toggle = (collapsed) => {
      this.setState({
        collapsed: !this.state.collapsed,
        mode: collapsed ? 'vertical' : 'inline'
      });
    };
  }
  render () {
    return (
      <Layout style={styles.main}>
        <Header style={styles.header}>
          <MyHeader />
        </Header>
        <Layout style={styles.layout}>
          <Sider
            style={styles.sider}
            collapsible={false}
            collapsed={this.state.collapsed}
            onCollapse={this.toggle}
            breakpoint="lg"
            collapsedWidth="60"
          >
            <SiderMenu name={this.state.mode} />
          </Sider>
          <Layout style={styles.inlayout}>
            <Breadcrumb style={styles.Breadcrumb}>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>用户</Breadcrumb.Item>
              <Breadcrumb.Item>列表</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={styles.Content}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>

    );
  }
}

export default Frame;
