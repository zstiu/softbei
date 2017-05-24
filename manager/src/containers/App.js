import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
// import { connect } from 'react-redux'
// import { browserHistory } from 'react-router'
import NotLogin from '../components/notLogin'
import LoginPage from './LoginPage'
// import { resetErrorMessage } from '../actions'


import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import './dist/App.css'
const { Header, Content, Footer,  Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {

  static propTypes = {
    manager: PropTypes.object,
  }

  handelChange(e){
    console.log(e);
    switch(e.key){
      case '1': 
                this.handelLogin();
                break;
      case '2': 
                this.handelUpdate();
                break;
      case '3': 
                this.handelSignUp();
                break;
      case '4': 
                this.handelUpload();
                break;
      case '5': 
                this.handelLogin();
                break;
      case '6': 
                this.handelManager();
                break;                                
    }
      
  }

  handelLogin = () => {
    console.log("进入login");
      browserHistory.push('/login')
  }

  handelSignUp = () => {
    browserHistory.push('/signUp')
  }

  handelUpload =() => {
    browserHistory.push('/upload')
  }

  handelManager =() => {
    browserHistory.push('/manager')
  }

  handelUpload =() => {
    browserHistory.push('/upload')
  }

  handelUpdate =() => {
    browserHistory.push('/updateInfo')
  }
  
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
    const { children, handelLogin, handelManager, handelUpload, manager, handelChange } = this.props
    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['6']} defaultOpenKeys={['sub1', 'sub2']} onClick={this.handelChange.bind(this)}>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span className="nav-text">{manager.isLogin?manager.name:"Manager(未登录)"}</span></span>}
            >
              <Menu.Item key="1">登录</Menu.Item>
              <Menu.Item key="2">更新信息</Menu.Item>
              <Menu.Item key="3">注册</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span className="nav-text">操作</span></span>}
            >
              <Menu.Item key="4">上传图片</Menu.Item>
              <Menu.Item key="5">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="6">
              <span>
                <Icon type="file" />
                <span className="nav-text">信息</span>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>


        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px'}}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>Manager</Breadcrumb.Item>
              <Breadcrumb.Item>{manager.isLogin?manager.name:"(未登录)"}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 1080  }}>


            

            {children}
              
            

            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>


        
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {


  return {
    manager: state.manager
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // handelChange: () => getManager("测试3", "123456")(dispatch)
  }
}

// Action Creator
// const increaseAction = { type: 'increase' }

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(App)


// export default App
