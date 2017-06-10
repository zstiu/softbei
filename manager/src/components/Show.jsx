import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Icon, Button, Card } from 'antd';

const Show = ({ fetchShow, manager, info }) => {
  const { login, avatarUrl, name, id } = manager
  const { total, finished } = info

  let clickGetInfo = () => {
    console.log("id = " + id);
    fetchShow(id)
  }


  if(info.total && info.finished > -1){
    return (
      <div className="show">
        <Card title="当前完成情况：" bordered={false} style={{ width: 300 }}>
          <p>总上传：{info.total}</p>
          <p>已完成：{info.finished}</p>
        </Card>
       
      </div>
    )
  }
  else{
    return (
      <div className="User">
        <Button type="primary" onClick={clickGetInfo}>
          点我查看上传图片完成情况!
        </Button>
      </div>
    )
  }
  
}

Show.propTypes = {
//   user: PropTypes.shape({
//     login: PropTypes.string.isRequired,
//     avatarUrl: PropTypes.string.isRequired,
//     name: PropTypes.string
//   }).isRequired
}

export default Show
