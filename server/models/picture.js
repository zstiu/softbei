const dbUtils = require('./../utils/db-util')

const picture = {

    /**
     * 数据库新加图片数据
     * @param  {object} model 用户数据模型
     * @return {object}       mysql执行结果
     */
    async create(picture) {
        let result = await dbUtils.insertData('picture', picture)
        return result
    },


    /**
     * 得到指定数量的picture数据
     * @param  {string} minId 用户浏览到的pictureID
     * @param  {string} limit 限制的查询条数
     * @return {object|null}     查找结果
     */
    async getPicture(minId, limit) {


        let _sql = `SELECT * from picture
            where id > ${minId} limit  ${minId}, ${limit+minId}`

        let result = await dbUtils.query(_sql)


        return result;
    },


    /**
     * labelNumber加一
     * @param  {string} minId 用户浏览到的pictureID
     * @param  {string} limit 限制的查询条数
     * @return {object|null}     查找结果
     */
    async plusLabelNumber(pictureId) {

        let _sql = `UPDATE picture SET labelNumber=labelNumber+1 WHERE id = ${pictureId}`

        let result = await dbUtils.query(_sql)


        return result;
    },




}


module.exports = picture