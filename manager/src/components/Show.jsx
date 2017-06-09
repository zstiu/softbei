import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Show = ({ fetchShow, manager, info }) => {
  const { login, avatarUrl, name, id } = manager
  const { total, finished } = info

  let clickGetInfo = () => {
    console.log("id = " + id);
    fetchShow(id)
  }

  return (
    <div className="User">
      <button onClick={clickGetInfo}>得到</button>
      
      当前完成情况：
      <br/>总上传：{info.total}
      <br/>已完成：{info.finished}
    </div>
  )
}

Show.propTypes = {
//   user: PropTypes.shape({
//     login: PropTypes.string.isRequired,
//     avatarUrl: PropTypes.string.isRequired,
//     name: PropTypes.string
//   }).isRequired
}

export default Show
