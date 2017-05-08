/**
 * restful api 子路由 （user模块）
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')
const managerController = require('./../controllers/manager')

const routers = router
    .post('/user/getUserInfo', userInfoController.getLoginUserInfo)
    .post('/user/signIn', userInfoController.signIn)
    .post('/user/signUp', userInfoController.signUp)
    .post('/user/signOut', userInfoController.signOut)
    .post('/user/update', userInfoController.update)
    .post('/user/exitPhone', userInfoController.exitPhone)
    .post('/manager/signUp', managerController.signUp)
    .post('/manager/uploadPicture', managerController.uploadPicture)


module.exports = routers