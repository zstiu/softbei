import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
// import { getManager } from '../actions'
// import Upload from '../components/Upload'
// import { Icon, Button } from 'antd';

import { Upload, Button, Icon } from 'antd';

const fileList = [{
  uid: -1,
  name: 'xxx.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}, {
  uid: -2,
  name: 'yyy.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}];


const props = {
  action: '//localhost:3001/api/manager/uploadPicture',
  listType: 'picture',
  defaultFileList: [...fileList],
  className: 'upload-list-inline',
  multiple: true
};


class UploadPage extends Component {
    render() {

        return (
            <div>
                <Upload {...props} >
                <Button>
                    <Icon type="upload" /> upload
                </Button>
                </Upload>
            </div>
        )
    }
        
}

export default UploadPage
