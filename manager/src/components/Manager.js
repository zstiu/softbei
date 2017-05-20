import React, { PropTypes } from 'react';
// import { Card } from 'antd';
import { Form, Icon, Input, Button, Checkbox, Alert, Card  } from 'antd';
// import { Link } from 'react-router'

const Manager = ({ manager }) => {
  const { name, managerId, email, token, phone, created_time } = manager

  return (
    <div className="User">
      <Card title="所有资料" extra={<a href="#">More</a>} style={{ width: 1000 }}>
        <h2>{name}</h2>
        <p>managerId：{managerId}</p>
        <p>email: {email}</p>
        <p>phone: {phone}</p>
        <p>token: {token}</p>
      </Card>
    </div>
  )
}

Manager.propTypes = {
  manager: PropTypes.shape({
    name: PropTypes.string.isRequired,
    managerId: PropTypes.number.isRequired,
    // name: PropTypes.string
  }).isRequired
}

export default Manager
