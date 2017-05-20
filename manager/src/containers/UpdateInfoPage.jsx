import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { updateAction } from '../actions'
// import Manager from '../components/Manager'
import Update from '../components/Update'
// import zip from 'lodash/zip'
// import './dist/Login.css'


class UpdateInfoPage extends Component {
  static propTypes = {
    manager: PropTypes.object,
  }


  render() {
      const { manager } = this.props
      return (<div>
      <Update fetchUpdate={this.props.fetchUpdate} manager={manager} />
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
                fetchUpdate: (name, email, phone) => {
                    updateAction(name, email, phone)(dispatch);
                    // browserHistory.push(`/manager`)
                    }
            }
        }

// Action Creator
// const increaseAction = { type: 'increase' }

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(UpdateInfoPage)
