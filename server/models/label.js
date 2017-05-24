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


    /**
     * 通过pictureId label 取某一picture对应某一label数量
     * @param  {string} pictureId 图片id
     * @param  {string} label label值
     * @return {object}       mysql执行结果
     */
    async getNumberOfLabel(pictureId, label) {

        let _sql = `SELECT label FROM label WHERE userId = ${userId} AND pictureId = ${pictureId}`;
        let result = await dbUtils.query(_sql)

        // let result = await dbUtils.getLabel(userId, pictureId);
        return result
    },


    /**
     * 通过userId pictureId 取label 用于判断是否重复提交
     * @param  {string} userId 用户id
     * @param  {string} pictureId 图片id
     * @return {object}       mysql执行结果
     */
    async getHistoryLabel(userId, limit, page) {

        let start = limit * (page - 1);
        let end = limit * page - 1;
        //暂定方案：select语句得到关键字内容
        //TODO: 对比关键字与图片标签的相似度
        let _sql = `SELECT * from label
            LIMIT ${start},${end}`
            // console.log(_sql);

        // let _sql = `SELECT label FROM label WHERE userId = ${userId} AND pictureId = ${pictureId}`;
        let result = await dbUtils.query(_sql)

        // let result = await dbUtils.getLabel(userId, pictureId);
        return result
    },


}


module.exports = picture