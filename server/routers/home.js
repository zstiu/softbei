/**
 * 主页子路由
 */

const router = require('koa-router')()
const index = require('../controllers/index')

module.exports = router
    .get('/', async(ctx, next) => {
        ctx.body = "首页"
    })