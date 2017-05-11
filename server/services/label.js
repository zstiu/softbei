/**
 * 用户业务操作
 */

const validator = require('validator')
const labelModel = require('./../models/label')
const tokenModel = require('./../models/access-token')
const userCode = require('./../codes/user')

const label = {

    /**
     * 数据库新加标签数据
     * @param  {object} model 用户数据模型
     * @return {object}       mysql执行结果
     */
    async addPictureLabel(userId, pictureId, labelInfo) {

        let label = {
            userId: userId,
            pictureId: pictureId,
            label: labelInfo,
            created_time: new Date().getTime()
        }
        let result = await labelModel.create(label)
        return result
    },

    // /**
    //  * 查找存在用户信息
    //  * @param  {object} formData 查找的表单数据
    //  * @return {object|null}      查找结果
    //  */
    // async getExistOne(formData) {
    //     let resultData = await userModel.getExistOne({
    //         'email': formData.email,
    //         'name': formData.name
    //     })
    //     return resultData
    // },

    // /**
    //  * 本业务内登录操作
    //  * @param  {object} formData 登录表单信息
    //  * @return {object}          登录业务操作结果
    //  */
    // async signIn(formData) {
    //     let resultData = await userModel.getOneByUserNameAndPassword({
    //         'password': formData.password,
    //         'name': formData.name
    //     })

    //     return resultData
    // },


    // /**
    //  * 更新用户信息
    //  * @param {object} user 
    //  */
    // async updateUserInfo(user) {
    //     let result = await userModel.updateUserInfo(user);
    //     return result;
    // },


    // // /**
    // //  * 校验用户的登录状态
    // //  * @param  {obejct} ctx 上下文对象
    // //  */
    // // async isLogin(ctx) {
    // //     let userData = await userModel.getUserInfoByUserName(ctx.request.body.userName);
    // // },


    // /**
    //  * 根据用户名查找用户业务操作
    //  * @param  {string} userName 用户名
    //  * @return {object|null}     查找结果
    //  */
    // async getUserInfoByUserName(userName) {

    //     let resultData = await userModel.getUserInfoByUserName(userName) || {};
    //     // let userInfo = {
    //     //     id: resultData.id,
    //     //     name: resultData.name,
    //     //     email: resultData.email,
    //     //     // userName: resultData.name,
    //     //     major: resultData.major,
    //     //     marked: resultData.marked,
    //     //     create_time: resultData.create_time,
    //     //     modified_time: resultData.modified_time,
    //     //     score: resultData.score,
    //     //     level: resultData.level
    //     // }
    //     return resultData;
    // },


    // /**
    //  * 检验用户注册数据
    //  * @param  {object} userInfo 用户注册数据
    //  * @return {object}          校验结果
    //  */
    // validatorSignUp(userInfo) {
    //     let result = {
    //         success: false,
    //         message: '',
    //     }

    //     if (/[a-z0-9\u4e00-\u9fa5\_\-]{1,10}/.test(userInfo.name) === false) {
    //         result.message = userCode.ERROR_USER_NAME
    //         return result
    //     }
    //     if (!validator.isEmail(userInfo.email)) {
    //         result.message = userCode.ERROR_EMAIL
    //         return result
    //     }
    //     if (!/[\w+]{6,16}/.test(userInfo.password)) {
    //         result.message = userCode.ERROR_PASSWORD
    //         return result
    //     }
    //     if (userInfo.password !== userInfo.confirmPassword) {
    //         result.message = userCode.ERROR_PASSWORD_CONFORM
    //         return result
    //     }

    //     result.success = true

    //     return result
    // }

}

module.exports = label