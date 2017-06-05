/**
 * restful api 子路由 （user模块）
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')
const managerController = require('./../controllers/manager')
const pictureController = require('./../controllers/picture')

const routers = router
    .post('/user/getUserInfo', userInfoController.getLoginUserInfo)
    .post('/user/signIn', userInfoController.signIn)
    .post('/user/signUp', userInfoController.signUp)
    .post('/user/signOut', userInfoController.signOut)
    .post('/user/update', userInfoController.update)
    .post('/user/updateUserAvatar', userInfoController.updateUserAvatar)
    .post('/user/exitPhone', userInfoController.exitPhone)
    .post('/user/getUserMessage', userInfoController.getUserMessage)
    .post('/user/addPictureLabel', userInfoController.addPictureLabel)
    .post('/user/getHistoryLabel', userInfoController.getHistoryLabel)
    .post('/manager/signUp', managerController.signUp)
    .post('/manager/signIn', managerController.signIn)
    .post('/manager/uploadPicture', managerController.uploadPicture)
    .post('/picture/getPicture', pictureController.getPicture)
    .post('/picture/searchPicture', pictureController.searchPicture)
    .post('/picture/getPictureById', pictureController.getPictureById)

module.exports = routers