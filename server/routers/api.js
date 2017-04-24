/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')

const routers = router
    .post('/user/getUserInfo', userInfoController.getLoginUserInfo)
    .post('/user/signIn', userInfoController.signIn)
    .post('/user/signUp', userInfoController.signUp)
    .post('/user/signOut', userInfoController.signOut)


module.exports = routers