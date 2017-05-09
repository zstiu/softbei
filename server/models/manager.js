const dbUtils = require('./../utils/db-util')

const manager = {

    /**
     * 数据库创建用户
     * @param  {object} manager 用户数据模型
     * @return {object}       mysql执行结果
     */
    async createManager(manager) {
        let result = await dbUtils.insertData('manager_info', manager)
        return result
    },



    /**
     * 新建与改管理员关联的数据表，用于存储上传图片  表名强制为manager-${managerId}
     */
    async createManagerTable(table, options) {
        let result = await dbUtils.createTable(table, options);
        return result;
    },

    /**
     * 查找一个存在用户的数据
     * @param  {obejct} options 查找条件参数
     * @return {object|null}        查找结果
     */
    async getExistOne(options) {
        let _sql = `
    SELECT * from manager_info
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

    /**
     * 根据用户名和密码查找用户
     * @param  {object} options 管理员密码对象
     * @return {object|null}         查找结果
     */
    async getOneByManagerNameAndPassword(options) {
        let _sql = `
    SELECT * from manager_info
      where password="${options.password}" and name="${options.name}"
      limit 1`
        let result = await dbUtils.query(_sql)
        console.log("result.length = " + result.length);
        console.log("options.password = " + options.password);
        console.log("options.name = " + 　options.name);
        if (result.length > 0) {
            result = result[0]
        } else {
            console.log(result.length);
            result = null
        }
        return result
    },

    /**
     * 根据用户名查找用户信息
     * @param  {string} managerName 用户账号名称
     * @return {object|null}     查找结果
     */
    async getManagerInfoByManagerName(managerName) {

        let result = await dbUtils.selectDateByName(
            'manager_info', ['id', 'email', 'name', 'created_time', 'modified_time', 'phone'], managerName)
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        return result
    },






    /**
     * 更新相应用户信息
     * @param {object} user 
     */
    // async updateUserInfo(user) {
    //     let result = await dbUtils.updateData("user_info", user, user.id);
    //     return result;
    // }



}


module.exports = manager