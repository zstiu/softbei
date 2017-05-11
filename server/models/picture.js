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

    // /**
    //  * 查找一个存在用户的数据
    //  * @param  {obejct} options 查找条件参数
    //  * @return {object|null}        查找结果
    //  */
    // async getExistOne(options) {
    //     let _sql = `
    // SELECT * from user_info
    //   where email="${options.email}" or name="${options.name}"
    //   limit 1`
    //     let result = await dbUtils.query(_sql)
    //     if (Array.isArray(result) && result.length > 0) {
    //         result = result[0]
    //     } else {
    //         result = null
    //     }
    //     return result
    // },

    // /**
    //  * 根据用户名和密码查找用户
    //  * @param  {object} options 用户名密码对象
    //  * @return {object|null}         查找结果
    //  */
    // async getOneByUserNameAndPassword(options) {
    //     let _sql = `
    // SELECT * from user_info
    //   where password="${options.password}" and name="${options.name}"
    //   limit 1`
    //     let result = await dbUtils.query(_sql)
    //     console.log("result.length = " + result.length);
    //     console.log("options.password = " + options.password);
    //     console.log("options.name = " + 　options.name);
    //     if (result.length > 0) {
    //         result = result[0]
    //     } else {
    //         result = null
    //     }
    //     return result
    // },

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


        // let result = await dbUtils.findDataByPage("picture", "*", minId, minId)
        // if (Array.isArray(result) && result.length > 0) {
        //     result = result[0]
        // } else {
        //     result = null
        // }
        return result;
    },



    // /**
    //  * 更新相应用户信息
    //  * @param {object} user 
    //  */
    // async updateUserInfo(user) {
    //     let result = await dbUtils.updateData("user_info", user, user.id);
    //     return result;
    // }



}


module.exports = picture