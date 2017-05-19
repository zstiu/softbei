import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { loginAction } from '../actions'
// import Manager from '../components/Manager'
import Login from '../components/Login'
// import zip from 'lodash/zip'
// import './dist/Login.css'


class LoginPage extends Component {
  static propTypes = {
    manager: PropTypes.object,
  }


  render() {
      return (<h1>
      <Login fetchLogin={this.props.fetchLogin} />

      </h1>)
  }
}
    // const { starredRepos, starredRepoOwners, starredPagination } = this.props


const mapStateToProps = (state) => {


    return {
        // manager: state.manager
    }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
                // handelChange: () => getManager("测试3", "123456")(dispatch)
                fetchLogin: (name, password) => {
                    loginAction(name, password)(dispatch);
                    browserHistory.push(`/manager`)

                    }
            }
        }

// Action Creator
// const increaseAction = { type: 'increase' }

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(LoginPage)
