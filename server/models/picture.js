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

        console.log(typeof minId);
        console.log(typeof limit);

        let _sql = `SELECT * from picture
            where id > ${minId} limit  ${minId}, ${limit+minId}`

        console.log(_sql);
        let result = await dbUtils.query(_sql)

        console.log(result);

        return result;
    },




}


module.exports = picture