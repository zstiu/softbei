import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { getPictureInfoAction } from '../actions'
import NotLogin from '../components/notLogin'
// import Manager from '../components/Manager'
import Show from '../components/Show'
// import zip from 'lodash/zip'
// import './dist/Login.css'


class ShowPage extends Component {
  static propTypes = {
    manager: PropTypes.object,
    info: PropTypes.object
  }


  render() {
      const { manager, info } = this.props

          if (!manager.isLogin) {
            return <NotLogin/>
            }

      else return (<div>
      <Show fetchShow={this.props.fetchShow} manager={manager} info={info} />
      </div>
      )
  }
}
    // const { starredRepos, starredRepoOwners, starredPagination } = this.props


    const mapStateToProps = (state) => {


        return {
            manager: state.manager,
            info: state.info
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
                // handelChange: () => getManager("测试3", "123456")(dispatch)
                fetchShow: (id) => {
                    getPictureInfoAction(id)(dispatch);
                    // browserHistory.push(`/manager`)
                    }
            }
        }

// Action Creator
// const increaseAction = { type: 'increase' }

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ShowPage)
