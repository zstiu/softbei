import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Explore from '../components/Explore'
import { resetErrorMessage } from '../actions'


import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './dist/App.css'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends React.Component {
  
  state = {
    collapsed: false,
    mode: 'inline',
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }
  render() {
    const { children } = this.props
    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['6']}>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span className="nav-text">User</span></span>}
            >
              <Menu.Item key="1">Tom</Menu.Item>
              <Menu.Item key="2">Bill</Menu.Item>
              <Menu.Item key="3">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span className="nav-text">Team</span></span>}
            >
              <Menu.Item key="4">Team 1</Menu.Item>
              <Menu.Item key="5">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="6">
              <span>
                <Icon type="file" />
                <span className="nav-text">File</span>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        {children}
      </Layout>
    );
  }
}



export default App
