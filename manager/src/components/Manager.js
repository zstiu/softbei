import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Manager = ({ manager }) => {
  const { name, managerId } = manager

  return (
    <div className="User">
      <p>您已登录：{name}</p>
      <p>managerId：{managerId}</p>

    </div>
  )
}

Manager.propTypes = {
  manager: PropTypes.shape({
    name: PropTypes.string.isRequired,
    managerId: PropTypes.string.isRequired,
    // name: PropTypes.string
  }).isRequired
}

export default Manager
