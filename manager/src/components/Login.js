import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Input } from 'antd';

const Login = ({ manager }) => {
  // const { name, managerId } = manager

  return (
    <div className="User">
      name：<Input placeholder="Basic usage" name="name" style={{ width: 200 }}/>
      <br/>
      password：<Input placeholder="Basic usage" name="password" style={{ width: 200 }}/>
    </div>
  )
}

// Login.propTypes = {
//   manager: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     managerId: PropTypes.string.isRequired,
//     // name: PropTypes.string
//   }).isRequired
// }

export default Login
