const dbUtils = require('./../utils/db-util')

const message = {

    /**
     * 数据库新加message数据
     * @param  {object} model 用户数据模型
     * @return {object}       mysql执行结果
     */
    async create(message) {
        let result = await dbUtils.insertData('message', message)
        return result
    },

    /**
     * 查找用户的message
     * @param  {obejct} options 查找条件参数
     * @return {object|null}        查找结果
     */
    async getUserMessage(userId) {
        let _sql = `SELECT * from message
        where userId="${userId}"`
        let message = await dbUtils.query(_sql)

        return message
    },

}


module.exports = message