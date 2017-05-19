import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
// import { getManager } from '../actions'
// import Upload from '../components/Upload'
// import { Icon, Button } from 'antd';

import { Upload, Button, Icon } from 'antd';




class UploadPage extends Component {

      static propTypes = {
            props: PropTypes.object,
        }




    render() {
        const { props } = this.props
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


const mapStateToProps = (state) => {

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

        const {
            managerId,
            token
        } = state.manager

        const props = {
            action: '//localhost:3001/api/manager/uploadPicture?managerId='+managerId+'&token='+token,
            listType: 'picture',
            defaultFileList: [...fileList],
            className: 'upload-list-inline',
            multiple: true
        };



//   const starredPagination = starredByUser[login] || { ids: [] }
//   const starredRepos = starredPagination.ids.map(id => repos[id])
//   const starredRepoOwners = starredRepos.map(repo => users[repo.owner])

  return {
    props: props
  }
}

export default connect(
    mapStateToProps
)(UploadPage)
