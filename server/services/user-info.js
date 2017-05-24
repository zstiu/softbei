/**
 * 用户业务操作
 */

const validator = require('validator')
const userModel = require('./../models/user-info')
const tokenModel = require('./../models/access-token')
const userCode = require('./../codes/user')
const uuidV4 = require('uuid/v4');

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
            'id': formData.id,
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
        let userResult = await userModel.getOneByUserNameAndPassword({
            'password': formData.password,
            'name': formData.name
        })

        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }

        if (userResult) {
            if (formData.name === userResult.name) {
                result.success = true
                let userInfo = await userModel.getUserInfoByUserName(formData.name)
                if (userInfo) {
                    result.data = userInfo;
                    // formDate.id = userInfo.id; //为登录用户
                    let token = await tokenModel.getToken(userInfo);
                    if (token[0]) {
                        result.data.token = token[0].accessToken;
                    } else {
                        const access_token = uuidV4();
                        let token = {
                            userId: userInfo.id,
                            accessToken: access_token,
                            deadline: new Date().getTime() + (365 * 24 * 60 * 60 * 1000), //过期时间一年
                            type: 1
                        };
                        if (await tokenModel.create(token)) {
                            result.data.token = access_token;
                        }
                    }

                }
                result.message = userCode.LOGIN_SUCCESS;
                // else {
                //     result.message = userCode.FAIL_USER_NO_LOGIN
                // }
            } else {
                result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
                result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
            }
        } else {
            result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
            result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
        }

        // console.log("result.data.token = " + result.data.token);

        return result
    },


    /**
     * 更新用户信息
     * @param {object} formData 
     */
    async updateUserInfo(formData) {

        let user = {
            id: formData.id,
            modified_time: new Date().getTime(),
        }

        if (formData.name) {
            user.name = formData.name;
        }

        if (formData.email) {
            user.email = formData.email;
        }

        if (formData.phone) {
            user.phone = formData.phone;
        }

        if (formData.major) {
            user.major = formData.major;
        }

        if (formData.introduction) {
            user.introduction = formData.introduction;
        }

        if (formData.sex) {
            user.sex = formData.sex;
        }

        if (formData.birthday) {
            user.birthday = formData.birthday;
        }

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
        console.log(typeof userInfo.email);
        if (typeof userInfo.email === String) {
            if (!validator.isEmail(userInfo.email)) {
                result.message = userCode.ERROR_EMAIL
                return result
            }
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

    /**
     * 根据用户id 查找用户pictureId
     * @param  {string} userName 用户账号名称
     * @return {object|null}     查找结果
     */
    async getPictureidByUserId(id) {

        let pictureId = await userModel.getPictureidByUserId(id);
        return pictureId;
    },



    /**
     * 用户id正在查看n个picture
     * 更新用户pictureId
     * @param  {string} id 用户id
     * @param  {string} n 用户正在查看n条数据
     * @return {object|null}     查找结果
     */
    async watchingPicture(id, lastPictureId) {



        let result = await userModel.watchingPicture(id, lastPictureId)

        return result
    },

    /**
     * 根据用户id 查找用户等级
     * @param  {string} userName 用户账号名称
     * @return {object|null}     查找结果
     */
    async getLevelByUserId(id) {

        let level = await userModel.getLevelByUserId(id);
        return level;
    },


    /**
     * 根据用户id 查找用户积分
     * @param  {number} id 用户账号名称
     * @return {object|null}     查找结果
     */
    async getScoreByUserId(id) {

        let score = await userModel.getScoreByUserId(id);
        return score;
    },


    /**
     * 用户打一次标签，积分增加
     * @param  {string} id 用户账号userId
     * @return {object|null}     查找结果
     */
    async plusUserScore(id, n) {

        let result = await userModel.plusUserScore(id, n);
        return result;
    },

    /**
     * 用户升一级
     * @param  {string} id 用户账号userId
     * @return {object|null}     查找结果
     */
    async plusUserLevel(id) {

        let result = await userModel.plusUserLevel(id);
        return result;
    },


    /**
     * 更新用户头像
     * @param {object} formData 
     */
    async updateUserAvatar(formData) {

        let user = {
            id: formData.id,
            avatarUrl: formData.avatarUrl,
            modified_time: new Date().getTime(),
        }


        let result = await userModel.updateUserAvatar(user);
        return result;
    },


    /**
     * 通过userId,查询label表中已打最多的三个标签,更新user表的type
     * @param  {string} userId 用户id
     * @return {object}       mysql执行结果
     */
    async updateUserType(userId) {

        let selectResult = await userModel.getMostTypeInLabel(userId);

        let newType = '';
        for (var index = 0; index < selectResult.length - 1; index++) {
            newType = newType + selectResult[index].type + ",";
        }
        newType = newType + selectResult[index].type;

        let result = await userModel.updateUserType(userId, newType)

        return result
    },


    /**
     * 根据用户id 查找用户兴趣type
     * @param  {number} id 用户账号名称
     * @return {object|null}     查找结果
     */
    async getType(id) {

        let type = await userModel.getType(id);
        return type;
    },



}

module.exports = user