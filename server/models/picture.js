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
            where id > ${minId} limit  0, ${limit}`

        let result = await dbUtils.query(_sql)


        return result;
    },


    /**
     * labelNumber加一
     * @param  {string} pictureId 
     * @return {object|null}     查找结果
     */
    async plusLabelNumber(pictureId) {

        let _sql = `UPDATE picture SET labelNumber=labelNumber+1 WHERE id = ${pictureId}`

        let result = await dbUtils.query(_sql)


        return result;
    },


    /**
     * 根据关键字搜索
     * @param  {string} search 用户浏览到的pictureID
     * @return {object|null}     查找结果
     */
    async searchPicture(search, limit, page) {

        console.log(search, limit, page);

        let start = limit * (page - 1);
        let end = limit * page - 1;
        //暂定方案：select语句得到关键字内容
        //TODO: 对比关键字与图片标签的相似度
        let _sql = `SELECT * from picture
            where isFinished='0' and (acceptedLabel LIKE '%${search}%' OR recognitionLabel LIKE '${search}' OR resultLabel LIKE '${search}') LIMIT ${start},${end}`
        console.log(_sql);
        let result = await dbUtils.query(_sql)


        return result;
    },


    /**
     * 通过pictureId,查询label表中已打最多的三个标签,更新picture表的type
     * @param  {string} pictureId 图片id
     * @return {object}       mysql执行结果
     */
    async getMostTypeInLabel(pictureId) {

        let _sqlSelect = `
        SELECT type,count(*) as count FROM label WHERE pictureId=${pictureId} group by type having count>0 LIMIT 0,3
        `
        console.log(_sqlSelect);
        let selectResult = await dbUtils.query(_sqlSelect)
        console.log(selectResult);

        return selectResult;
    },

    /**
     * 通过pictureId,查询label表中已打最多的三个标签,更新picture表的type
     * @param  {string} pictureId 图片id
     * @return {object}       mysql执行结果
     */
    async updatePictureType(pictureId, type) {


        let _sqlUpdate = `
        UPDATE picture SET type='${type}' WHERE id=${pictureId}
        `
        console.log(_sqlUpdate);
        let updateResult = await dbUtils.query(_sqlUpdate)
        console.log(updateResult)

        return updateResult;
    },




}


module.exports = picture