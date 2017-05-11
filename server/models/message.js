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
    async getExistOne(options) {
        let _sql = `
    SELECT * from user_info
      where email="${options.email}" or name="${options.name}" or phone="${options.phone}"
      limit 1`
        let result = await dbUtils.query(_sql)
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        return result
    },

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

    // /**
    //  * 根据用户名查找用户信息
    //  * @param  {string} userName 用户账号名称
    //  * @return {object|null}     查找结果
    //  */
    // async getUserInfoByUserName(userName) {

    //     let result = await dbUtils.selectDateByName(
    //         'user_info', ['id', 'email', 'name', 'avatarUrl', 'sex', 'birthday', 'major', 'marked', 'introduction', 'create_time', 'modified_time', 'score', 'level', 'phone'], userName)
    //     if (Array.isArray(result) && result.length > 0) {
    //         result = result[0]
    //     } else {
    //         result = null
    //     }
    //     return result
    // },



    // /**
    //  * 更新相应用户信息
    //  * @param {object} user 
    //  */
    // async updateUserInfo(user) {
    //     let result = await dbUtils.updateData("user_info", user, user.id);
    //     return result;
    // },


    // /**
    //  * 检验当前手机号是否已注册
    //  * @param  {obejct} options 查找条件参数 只有phone
    //  * @return {object|null}        查找结果
    //  */
    // async exitPhone(options) {
    //     let _sql = `
    // SELECT * from user_info
    //   where phone="${options.phone}"
    //   limit 1`
    //     let result = await dbUtils.query(_sql)
    //     if (Array.isArray(result) && result.length > 0) {
    //         result = result[0]
    //     } else {
    //         result = null
    //     }
    //     console.log("result");
    //     return result
    // },



}


module.exports = message