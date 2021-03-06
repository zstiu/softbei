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
        // let end = limit * page - 1;

        let _sql = `SELECT u.id as labelId,userId,pictureId,label,type,u.created_time,name as managerName from label as u 
left join manager_info a on u.managerId = a.id  WHERE userId = ${userId} AND isCleanUp="0" LIMIT ${start},${limit}`
            // console.log(_sql);

        // let _sql = `SELECT label FROM label WHERE userId = ${userId} AND pictureId = ${pictureId}`;
        let result = await dbUtils.query(_sql)

        // let result = await dbUtils.getLabel(userId, pictureId);
        return result
    },


    /**
     * 清除userId对应的所有label
     * @param  {string} userId 用户id
     * @return {object}       mysql执行结果
     */
    async cleanHistoryLabel(userId) {


        let _sql = `UPDATE label SET isCleanUp=1 WHERE userId = ${userId}`
            // console.log(_sql);

        // let _sql = `SELECT label FROM label WHERE userId = ${userId} AND pictureId = ${pictureId}`;
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
    async getLabelByUseridPictureid(userId, pictureId) {

        let _sql = `SELECT u.id as labelId,userId,pictureId,label,type,u.created_time,name as managerName from label as u 
left join manager_info a on u.managerId = a.id  WHERE userId = ${userId} AND pictureId=${pictureId}`
            // console.log(_sql);

        // let _sql = `SELECT label FROM label WHERE userId = ${userId} AND pictureId = ${pictureId}`;
        let result = await dbUtils.query(_sql)

        // let result = await dbUtils.getLabel(userId, pictureId);
        return result
    },


    /**
     * 清除userId对应的所有label
     * @param  {string} userId 用户id
     * @return {object}       mysql执行结果
     */
    async deleteHistoryLabel(userId, pictureId) {


        let _sql = `DELETE FROM label WHERE userId = ${userId} AND pictureId=${pictureId}`
            // console.log(_sql);

        // let _sql = `SELECT label FROM label WHERE userId = ${userId} AND pictureId = ${pictureId}`;
        let result = await dbUtils.query(_sql)

        // let result = await dbUtils.getLabel(userId, pictureId);
        return result
    },


}


module.exports = picture