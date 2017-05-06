/**
 * restful api 子路由 （image模块）
 */

const router = require('koa-router')()
    // const userInfoController = require('./../controllers/user-info')

const routers = router
    .post('/user/getUserInfo', userInfoController.getLoginUserInfo)
    .post('/user/signIn', userInfoController.signIn)
    .post('/user/signUp', userInfoController.signUp)
    .post('/user/signOut', userInfoController.signOut)
    .post('/user/update', userInfoController.update)


module.exports = routers