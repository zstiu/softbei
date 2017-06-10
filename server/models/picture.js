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
    async getPicture(minId, type, limit) {

        let _sql = ``

        switch (type.length) {
            case 0:
                _sql = `SELECT * from picture where id > ${minId} limit  0, ${limit}`
                break;
            case 1:
                _sql = `SELECT * from picture where id > ${minId} AND (type LIKE '%${type[0]}%' OR type LIKE '%其他%') limit  0, ${limit}`
                break;
            case 2:
                _sql = `SELECT * from picture where id > ${minId} AND (type LIKE '%${type[0]}%' OR type LIKE '%${type[1]}%' OR type LIKE '%其他%') limit  0, ${limit}`
                break;
            case 3:
                _sql = `SELECT * from picture where id > ${minId} AND (type LIKE '%${type[0]}%' OR type LIKE '%${type[1]}%' OR type LIKE '%${type[2]}%' OR type LIKE '%其他%') limit  0, ${limit}`
                break;
        }

        console.log(_sql);
        let result = await dbUtils.query(_sql)
        console.log(result)

        return result;
    },


    /**
     * labelNumber加一
     * @param  {string} pictureId 
     * @return {object|null}     查找结果
     */
    async labeled(pictureId, n) {

        let _sql = `UPDATE picture SET labelNumber=labelNumber+${n} WHERE id = ${pictureId}`

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
        let end = limit * page;
        //暂定方案：select语句得到关键字内容
        //TODO: 对比关键字与图片标签的相似度
        let _sql = `SELECT * from picture
            where isFinished='0' and (type LIKE '%${search}%' OR acceptedLabel LIKE '%${search}%' OR recognitionLabel LIKE '${search}' OR resultLabel LIKE '${search}') LIMIT ${start},${end}`
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
    async getMostLabelNameInLabel(pictureId) {

        let _sqlSelect = `
        SELECT label,count(*) as count FROM label WHERE pictureId=${pictureId} group by type having count>20 LIMIT 0,3
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


    /**
     * 通过pictureId,查询label表中已打最多的三个标签,更新picture表的type
     * @param  {string} pictureId 图片id
     * @return {object}       mysql执行结果
     */
    async updatePictureAcceptedLabel(pictureId, label) {


        let _sqlUpdate = `
        UPDATE picture SET acceptedLabel='${label}' WHERE id=${pictureId}
        `
        console.log(_sqlUpdate);
        let updateResult = await dbUtils.query(_sqlUpdate)
        console.log(updateResult)

        return updateResult;
    },

    /**
     * 得到指定数量的随机picture数据
     * @param  {string} minId 用户浏览到的pictureID
     * @param  {string} limit 限制的查询条数
     * @return {object|null}     查找结果
     */
    async getRandomPicture(limit) {

        let _sql = `SELECT * FROM picture  ORDER BY  RAND() LIMIT ${limit}`



        console.log(_sql);
        let result = await dbUtils.query(_sql)
        console.log(result)

        return result;
    },


    /**
     * 得到指定picture的managerId
     * @param  {number} id
     * @return {object|null}     查找结果
     */
    async getManagerIdOfPicture(id) {

        let _sql = `SELECT managerId FROM picture WHERE id=${id}`



        console.log(_sql);
        let result = await dbUtils.query(_sql)
        console.log(result)

        return result;
    },


    /**
     * 通过id得到指定picture
     * @param  {number} id
     * @return {object|null}  picture   查找结果
     */
    async getPictureById(id) {

        let _sql = `SELECT * FROM picture WHERE id=${id}`

        let result = await dbUtils.query(_sql)


        return result;
    },


    /**
     * 通过type得到picture
     * @param  {string} type 
     * @return {object|null}     查找结果
     */
    async getPictureByType(type, limit, page) {

        let start = limit * (page - 1);
        let end = limit * page;
        //暂定方案：select语句得到关键字内容
        //TODO: 对比关键字与图片标签的相似度
        let _sql = `SELECT u.id as pictureId,path,type,acceptedLabel,labelNumber,isFinished,uploadTime,recognitionLabel,name as managerName from picture as u left join manager_info a on u.managerId = a.id 
            where isFinished='0' and (type LIKE '%${type}%' OR type LIKE '%其他%' ) LIMIT ${start},${end}`
        console.log(_sql);
        let result = await dbUtils.query(_sql)


        return result;
    },


    /**
     * 得到id对应manager的所有picture完成状态
     * @param  {string} id 
     * @return {object|null}     查找结果
     */
    async getAllPictureInfo(id) {

        //查询所有labelNumbaer与大于100作为可导出的labelNumber
        let _sql = `SELECT
                        count(labelNumber) as total,
                        count(labelNumber > 100 OR NULL) as finished
                    FROM
                        picture
                    WHERE
                        managerId=${id}`
        console.log(_sql);
        let result = await dbUtils.query(_sql)


        return result;
    },



}


module.exports = picture