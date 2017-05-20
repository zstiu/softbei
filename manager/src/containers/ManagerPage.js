import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
// import { getManager } from '../actions'
import Manager from '../components/Manager'
import NotLogin from '../components/notLogin'
import { Icon, Button } from 'antd';


class ManagerPage extends Component {
  static propTypes = {
    manager: PropTypes.object,
  }


  handleLoadMoreClick = () => {
    this.props.loadStarred(this.props.login, true)
  }


  handelLogin = () => {
      browserHistory.push(`/login`)
  }

  handelUpload =() => {
    browserHistory.push('/upload')
  }



  render() {
    const { manager, handelLogin, handelUpdate } = this.props
    if (!manager.isLogin) {
      return <NotLogin/>
    }

    // const { starredRepos, starredRepoOwners, starredPagination } = this.props
    else return (
      <div>
        <Manager manager={manager} />
        {
        //   <Button onClick={this.handelUpload}>
        //   <Icon type="login" />上传图片
        // </Button>
        }
        


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
