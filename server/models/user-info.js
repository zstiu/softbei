const dbUtils = require('./../utils/db-util')

const user = {

    /**
     * 数据库创建用户
     * @param  {object} model 用户数据模型
     * @return {object}       mysql执行结果
     */
    async create(model) {
        let result = await dbUtils.insertData('user_info', model)
        return result
    },

    /**
     * 查找一个存在用户的数据
     * @param  {obejct} options 查找条件参数
     * @return {object|null}        查找结果
     */
    async getExistOne(options) {

        let _sql = `SELECT * from user_info where id!=${options.id} and (email="${options.email}" or name="${options.name}" or phone="${options.phone}") limit 1`
        console.log(_sql);
        let result = await dbUtils.query(_sql)
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        console.log("exitOne:" + result);
        return result
    },

    /**
     * 根据用户名和密码查找用户
     * @param  {object} options 用户名密码对象
     * @return {object|null}         查找结果
     */
    async getOneByUserNameAndPassword(options) {
        let _sql = `
    SELECT * from user_info
      where password="${options.password}" and name="${options.name}"
      limit 1`
        let result = await dbUtils.query(_sql)
        console.log("result.length = " + result.length);
        console.log("options.password = " + options.password);
        console.log("options.name = " + 　options.name);
        if (result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        return result
    },

    /**
     * 根据用户名查找用户信息
     * @param  {string} userName 用户账号名称
     * @return {object|null}     查找结果
     */
    async getUserInfoByUserName(userName) {

        let result = await dbUtils.selectDateByName(
            'user_info', ['id', 'email', 'name', 'avatarUrl', 'sex', 'birthday', 'major', 'marked', 'introduction', 'create_time', 'modified_time', 'score', 'level', 'phone'], userName)
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
    async updateUserInfo(user) {
        let result = await dbUtils.updateData("user_info", user, user.id);
        return result;
    },


    /**
     * 取手机号对应的数据
     * @param  {obejct} options 查找条件参数 只有phone
     * @return {object|null}        查找结果
     */
    async exitPhone(options) {
        let _sql = `
    SELECT * from user_info
      where phone="${options.phone}"
      limit 1`
        let result = await dbUtils.query(_sql)
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        console.log("result");
        return result
    },

    /**
     * 根据用户id 查找用户pictureId
     * @param  {string} userName 用户账号名称
     * @return {object|null}     查找结果
     */
    async getPictureidByUserId(id) {

        let _sql = `SELECT pictureId FROM user_info WHERE id = ${id}`;
        let user = await dbUtils.query(_sql)

        // let user = await dbUtils.findDataById('user_info', id);
        // selectDateByName(
        //     'user_info', ['id', 'email', 'name', 'avatarUrl', 'sex', 'birthday', 'major', 'marked', 'introduction', 'create_time', 'modified_time', 'score', 'level', 'phone'], userName)
        if (Array.isArray(user) && user.length > 0) {
            user = user[0]
        } else {
            user = null
        }
        return user
    },


    /**
     * 用户id正在查看n个picture
     * 更新用户pictureId
     * @param  {string} id 用户id
     * @param  {string} n 用户正在查看n条数据
     * @return {object|null}     查找结果
     */
    async watchingPicture(id, n) {

        let _sql = `UPDATE user_info SET pictureId=pictureId+${n} WHERE id = ${id}`;
        console.log(_sql);
        let result = await dbUtils.query(_sql)
        console.log(typeof result);

        return result;
    },

    /**
     * 根据用户id 查找用户等级
     * @param  {string} userName 用户账号名称
     * @return {object|null}     查找结果
     */
    async getLevelByUserId(id) {

        let _sql = `SELECT level FROM user_info WHERE id = ${id}`;
        let user = await dbUtils.query(_sql)

        if (Array.isArray(user) && user.length > 0) {
            user = user[0]
        } else {
            user = null
        }
        return user
    },


    /**
     * 用户打一次标签，积分增加
     * @param  {string} id 用户账号userId
     * @return {object|null}     查找结果
     */
    async plusUserScore(id, n) {

        let _sql = `UPDATE user_info SET score=score+${n} WHERE id = ${id}`;
        let result = await dbUtils.query(_sql)


        return result;
    },

    /**
     * 更新相应用户头像
     * @param {object} user 
     */
    async updateUserAvatar(user) {
        let result = await dbUtils.updateData("user_info", user, user.id);
        return result;
    },


}


module.exports = user