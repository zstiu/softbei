import React, { PropTypes, Component } from 'react'
import { Alert, Button, Icon } from 'antd';
import { browserHistory } from 'react-router'
// import { Link } from 'react-router'

class NotLogin extends Component {

    handelLogin = () => {
      browserHistory.push(`/login`)
  }


  render(){
    return (
          <div>

          <Alert
            message="Warning"
            description="你还未登录，登录前所有操作不能进行"
            type="warning"
            showIcon
          />
            {
            //   <Button onClick={this.handelLogin}>
            //   <Icon type="login" />前往登录
            // </Button>
            }
            

            </div>
        )
      }
  }

// NotLogin.propTypes = {
//   manager: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     managerId: PropTypes.string.isRequired,
//     // name: PropTypes.string
//   }).isRequired
// }

export default NotLogin
