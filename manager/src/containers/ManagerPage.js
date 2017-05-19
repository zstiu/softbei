import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
// import { getManager } from '../actions'
import Manager from '../components/Manager'
import { Icon, Button } from 'antd';
// import Login from '../components/Login'
// import zip from 'lodash/zip'
// import './dist/App.css'

// const loadManager = (name, managerId) => {
//   getManager(name, managerId);
// }

class ManagerPage extends Component {
  static propTypes = {
    manager: PropTypes.object,
  }

//   componentWillMount() {
//     loadData(this.props)
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.login !== this.props.login) {
//       loadData(nextProps)
//     }
//   }

  handleLoadMoreClick = () => {
    this.props.loadStarred(this.props.login, true)
  }

  // handelChange = () => {
  //     console.log("getManger..");
  //   loadManager("test", 10);
  //   console.log();
  // }
  handelLogin = () => {
      browserHistory.push(`/login`)
  }

//   renderRepo([ repo, owner ]) {
//     return (
//       <Repo
//         repo={repo}
//         owner={owner}
//         key={repo.fullName} />
//     )
//   }

  render() {
    const { manager, handelLogin } = this.props
    if (!manager.isLogin) {
      return <h1>
      <h2>请先登录</h2>
      
      <Button onClick={this.handelLogin}>
        <Icon type="login" />前往登录
      </Button>

      </h1>
    }

    // const { starredRepos, starredRepoOwners, starredPagination } = this.props
    return (
      <div>
        <Manager manager={manager} />
        <hr />


      </div>
    )
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
)(ManagerPage)
