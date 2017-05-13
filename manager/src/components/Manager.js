import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Manager = ({ manager }) => {
  const { name, managerId } = user

  return (
    <div className="User">
      <p>您已登录：{name}</p>
      <p>managerId：{managerId}</p>
      // <Link to={`/${login}`}>
      //   <img src={avatarUrl} alt={login} width="72" height="72" />
      //   <h3>
      //     {login} {name && <span>({name})</span>}
      //   </h3>
      // </Link>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    manager: PropTypes.string.isRequired,
    // name: PropTypes.string
  }).isRequired
}

export default Manager
