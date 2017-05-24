import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { signUpAction } from '../actions'
// import Manager from '../components/Manager'
import SignUp from '../components/SignUp'
// import zip from 'lodash/zip'
// import './dist/Login.css'


class SignUpPage extends Component {
  static propTypes = {
    manager: PropTypes.object
  }


  render() {
      const { manager } = this.props
      return (<div>
      <SignUp fetchSignUp={this.props.fetchSignUp} manager={manager} />
      </div>
      )
  }
}
    // const { starredRepos, starredRepoOwners, starredPagination } = this.props


    const mapStateToProps = (state) => {


        return {
            manager: state.manager
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
                // handelChange: () => getManager("测试3", "123456")(dispatch)
                fetchSignUp: (name, password, confirmPassword, email, phone) => {
                    signUpAction(name, password, confirmPassword, email, phone)(dispatch);
                    // browserHistory.push(`/manager`)
                    }
            }
        }

// Action Creator
// const increaseAction = { type: 'increase' }

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(SignUpPage)
