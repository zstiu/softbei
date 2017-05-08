/**
 * 用户业务操作
 */

const validator = require('validator')
const userModel = require('./../models/user-info')
const tokenModel = require('./../models/access-token')
const userCode = require('./../codes/user')

const user = {

    /**
     * 创建用户
     * @param  {object} user 用户信息
     * @return {object}      创建结果
     */
    async create(user) {
        let result = await userModel.create(user)
        return result
    },

    /**
     * 查找存在用户信息
     * @param  {object} formData 查找的表单数据
     * @return {object|null}      查找结果
     */
    async getExistOne(formData) {
        let resultData = await userModel.getExistOne({
            'email': formData.email,
            'name': formData.name,
            'phone': formData.phone
        })
        return resultData
    },

    /**
     * 本业务内登录操作
     * @param  {object} formData 登录表单信息
     * @return {object}          登录业务操作结果
     */
    async signIn(formData) {
        let resultData = await userModel.getOneByUserNameAndPassword({
            'password': formData.password,
            'name': formData.name
        })

        return resultData
    },


    /**
     * 更新用户信息
     * @param {object} user 
     */
    async updateUserInfo(user) {
        let result = await userModel.updateUserInfo(user);
        return result;
    },


    // /**
    //  * 校验用户的登录状态
    //  * @param  {obejct} ctx 上下文对象
    //  */
    // async isLogin(ctx) {
    //     let userData = await userModel.getUserInfoByUserName(ctx.request.body.userName);
    // },


    /**
     * 根据用户名查找用户业务操作
     * @param  {string} userName 用户名
     * @return {object|null}     查找结果
     */
    async getUserInfoByUserName(userName) {

        let resultData = await userModel.getUserInfoByUserName(userName) || {};
        // let userInfo = {
        //     id: resultData.id,
        //     name: resultData.name,
        //     email: resultData.email,
        //     // userName: resultData.name,
        //     major: resultData.major,
        //     marked: resultData.marked,
        //     create_time: resultData.create_time,
        //     modified_time: resultData.modified_time,
        //     score: resultData.score,
        //     level: resultData.level
        // }
        return resultData;
    },


    /**
     * 检验用户注册数据
     * @param  {object} userInfo 用户注册数据
     * @return {object}          校验结果
     */
    validatorSignUp(userInfo) {
        let result = {
            success: false,
            message: '',
        }

        if (/[a-z0-9\u4e00-\u9fa5\_\-]{1,10}/.test(userInfo.name) === false) {
            result.message = userCode.ERROR_USER_NAME
            return result
        }
        if (!validator.isEmail(userInfo.email)) {
            result.message = userCode.ERROR_EMAIL
            return result
        }
        if (!/[\w+]{6,16}/.test(userInfo.password)) {
            result.message = userCode.ERROR_PASSWORD
            return result
        }
        if (userInfo.password !== userInfo.confirmPassword) {
            result.message = userCode.ERROR_PASSWORD_CONFORM
            return result
        }

        result.success = true

        return result
    },


    /**
     * 检验手机号是否已经注册
     * @param  {object} options 用户注册数据
     * @return {object}          校验结果
     */
    async exitPhone(options) {
        let result = {
            success: false,
            message: '',
            data: null,
            code: ""
        }

        // console.log(options.phone);
        // if (!validator.isMobilePhone(options.phone)) {
        //     result.message = userCode.ERROR_PHONE
        //     result.code = "0000";
        //     return result
        // }

        let user = await userModel.exitPhone(options);
        console.log(user);
        if (user && user.phone === options.phone) {
            result.message = userCode.FAIL_USER_PHONE_IS_EXIST;
            result.code = "0001";
            return result;
        }


        result.success = true
        result.message = ""
        result.code = "1111";

        return result
    },

}

module.exports = user