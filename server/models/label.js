const dbUtils = require('./../utils/db-util')

const picture = {

    /**
     * 数据库新加标签数据
     * @param  {object} model 用户数据模型
     * @return {object}       mysql执行结果
     */
    async create(label) {
        // lwt _sql = "INSERT INTO label SET ?"
        console.log(label);
        let result = await dbUtils.insertData("label", label)

        return result
    },

    /**
     * 通过userId pictureId 取label 用于判断是否重复提交
     * @param  {string} userId 用户id
     * @param  {string} pictureId 图片id
     * @return {object}       mysql执行结果
     */
    async getLabel(userId, pictureId) {

        let _sql = `SELECT label FROM label WHERE userId = ${userId} AND pictureId = ${pictureId}`;
        let result = await dbUtils.query(_sql)

        // let result = await dbUtils.getLabel(userId, pictureId);
        return result
    },


}


module.exports = picture