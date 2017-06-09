const userInfoService = require('./../services/user-info')
const accessTokenService = require('./../services/access-token')
const messageService = require('./../services/message')
const pictureService = require('./../services/picture')
const labelService = require('./../services/label')
const userCode = require('./../codes/user')
const uuidV4 = require('uuid/v4');
let config = require('../../config.js');

module.exports = {

    /**
     * 登录操作
     * @param  {obejct} ctx 上下文对象
     */
    async signIn(ctx) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }

        let userResultByName = await userInfoService.getUserInfoByUserName(formData.name);

        if (userResultByName) {
            result = await userInfoService.signIn(formData);

            // console.log("result.data.token = " + result.data.token);

            // if (userResult) {
            //     if (formData.name === userResult.name) {
            //         result.success = true
            //         let userInfo = await userInfoService.getUserInfoByUserName(formData.name)
            //         if (userInfo) {
            //             result.data = userInfo;
            //             // formDate.id = userInfo.id; //为登录用户
            //             let token = await accessTokenService.getToken(userInfo);
            //             if (token[0]) {
            //                 result.data.token = token[0].accessToken;
            //             } else {
            //                 const access_token = uuidV4();
            //                 let token = {
            //                     userId: userInfo.id,
            //                     accessToken: access_token,
            //                     deadline: new Date().getTime() + (365 * 24 * 60 * 60 * 1000), //过期时间一年
            //                     type: 1
            //                 };
            //                 if (await accessTokenService.create(token)) {
            //                     result.data.token = access_token;
            //                 }
            //             }

            //         }
            //         // else {
            //         //     result.message = userCode.FAIL_USER_NO_LOGIN
            //         // }
            //     } else {
            //         result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
            //         result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
            //     }
            // } else {
            //     result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
            //     result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
            // }
        } else {
            result.code = 'FAIL_USER_NO_EXIST';
            result.message = userCode.FAIL_USER_NO_EXIST
        }

        // if (formData.source === 'form' && result.success === true) {
        //     let session = ctx.session
        //     session.isLogin = true
        //     session.userName = userResult.name
        //     session.userId = userResult.id

        //     ctx.body = "登录成功"
        // } else {
        ctx.body = result
            // }
    },

    /**
     * 用户登出操作
     * TODO：先检验用户登陆状态，（删除token表相应数据）
     * @param {object} ctx 
     */
    async signOut(ctx) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }
        if (await accessTokenService.isLoged(formData) === 1) {
            // let resultDate = await accessTokenService.delete(formData);
            // if (resultDate) {
            result.success = true;
            // }
        } else if (await accessTokenService.isLoged(formData) === -1) {
            result.success = false;
            result.code = 'FAIL_USER_NO_LOGIN';
            result.message = userCode.FAIL_USER_NO_LOGIN;
        } else {
            result.code = 'FAIL_TOKEN_TIME';
            result.message = userCode.FAIL_TOKEN_TIME;
        }


        ctx.body = result

    },

    /**
     * 注册操作
     * @param   {obejct} ctx 上下文对象
     */
    async signUp(ctx) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null,
            code: ""
        }

        let validateResult = userInfoService.validatorSignUp(formData);

        if (validateResult.success === false) {
            result = validateResult
            ctx.body = result
            return
        }

        let existOne = await userInfoService.getExistOne(formData)
            // console.log(existOne)

        if (existOne) {
            if (existOne.name === formData.name) {
                result.message = userCode.FAIL_USER_NAME_IS_EXIST
                ctx.body = result
                return
            }
            if (existOne.email === formData.email) {
                result.message = userCode.FAIL_EMAIL_IS_EXIST
                ctx.body = result
                return
            }
            if (existOne.phone === formData.phone) {
                result.message = userCode.FAIL_USER_PHONE_IS_EXIST
                ctx.body = result
                return
            }
        }


        let userResult = await userInfoService.create({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            phone: formData.phone,
            create_time: new Date().getTime(),
            score: 0,
            level: 0,
            type: "其他"
        })

        // console.log(userResult)

        if (userResult && userResult.insertId * 1 > 0) {
            result = await userInfoService.signIn(formData);
            // result.success = true
            // result.code = "1111";
        } else {
            result.message = userCode.ERROR_SYS
        }

        ctx.body = result
    },


    /**
     * 更新用户信息
     * @param {object} ctx 上下文对象 
     */
    async update(ctx) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }

        let tokenStatus = await accessTokenService.isLoged(formData);
        if (tokenStatus === 1) {
            let existOne = await userInfoService.getExistOne(formData)
                // console.log(existOne)

            if (existOne) {
                if (existOne.name === formData.name) {
                    result.message = userCode.FAIL_USER_NAME_IS_EXIST
                    ctx.body = result
                    return
                }
                if (existOne.email === formData.email) {
                    result.message = userCode.FAIL_EMAIL_IS_EXIST
                    ctx.body = result
                    return
                }
                if (existOne.phone === formData.phone) {
                    result.message = userCode.FAIL_USER_PHONE_IS_EXIST
                    ctx.body = result
                    return
                }
            }



            let updateResult = await userInfoService.updateUserInfo(formData);
            if (updateResult) {
                // result.data = userInfo
                result.code = 1111;
                result.success = true
            } else {
                result.message = userCode.ERROR_SYS;
            }
        } else if (tokenStatus === 0) {
            result.code = 9999;
            result.message = userCode.FAIL_TOKEN_TIME;
        } else {
            // TODO
            result.code = 0000;
            result.message = userCode.FAIL_USER_NO_LOGIN;
        }

        ctx.body = result

    },



    /**
     * 获取用户信息
     * @param    {obejct} ctx 上下文对象
     */
    async getLoginUserInfo(ctx) {
        // let session = ctx.session
        // let isLogin = session.isLogin
        // let userName = session.userName

        // console.log('session=', session)
        let userDate = ctx.request.body;

        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }
        let tokenStatus = await accessTokenService.isLoged(userDate);
        if (tokenStatus === 1) {
            let userInfo = await userInfoService.getUserInfoByUserName(userDate.name);
            if (userInfo) {
                result.data = userInfo
                result.success = true
            } else {
                result.message = userCode.ERROR_SYS;
            }
        } else if (tokenStatus === 0) {
            result.code = 9999;
            result.message = userCode.FAIL_TOKEN_TIME;
        } else {
            // TODO
            result.code = 0000;
            result.message = userCode.FAIL_USER_NO_LOGIN;
        }

        ctx.body = result
    },


    /**
     * 检验手机号是否已经注册
     * @param   {obejct} ctx 上下文对象
     */
    async exitPhone(ctx) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null,
            code: ""
        }

        let validateResult = await userInfoService.exitPhone(formData);

        if (validateResult.success === false) {
            result = validateResult
            ctx.body = result
            return
        }



        result.success = true
        result.code = "1111";

        // result.message = userCode.ERROR_SYS


        ctx.body = result
    },


    /**
     * 查找用户的message
     * @param  {obejct} options 查找条件参数
     * @return {object|null}        查找结果
     */
    async getUserMessage(ctx) {

        let body = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: {
                messageList: []
            },
            code: ""
        }

        let tokenStatus = await accessTokenService.isLoged(body);
        if (tokenStatus === 1) {

            let message = await messageService.getUserMessage(body.id);
            // let userInfo = await userInfoService.getUserInfoByUserName(userDate.name);
            if (message.length > 0) {
                for (let i = 0; i < message.length; i++) {
                    result.data.messageList.push(message[i]);
                }

                result.success = true;
            } else {
                result.message = userCode.USER_NO_MESSAGE;
                result.success = true;
            }
        } else if (tokenStatus === 0) {
            result.code = 9999;
            result.message = userCode.FAIL_TOKEN_TIME;
        } else {
            // TODO
            result.code = 0000;
            result.message = userCode.FAIL_USER_NO_LOGIN;
        }




        ctx.body = result
    },


    /**
     * 贴标签操作
     * @param  {object} ctx 上下文
     * @return {object|null}        查找结果
     */
    async addPictureLabel(ctx) {

        let body = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null,
            code: ""
        }

        let tagArray = body.label.split(",");

        let label = await labelService.getLabel(body.id, body.pictureId);
        // console.log(label);
        if (label.length >= 1) {
            for (let i = 0; i < label.length; i++) {
                if (body.label === label[i].label) {
                    result.message = userCode.FAIL_RESUMMIT;
                    ctx.body = result;
                    return;
                }
            }
        }

        let level = (await userInfoService.getLevelByUserId(body.id)).level;

        //如果对某个picture打过多标签进行限制
        if (label.length + tagArray.length > (level / 5) + 1) {
            result.message = userCode.FAIL_TOO_MUCH_LABEL;
            ctx.body = result;
            return
        }

        console.log(level);
        let weight;
        if (level == 1) {
            weight = 1 * tagArray.length;
        } else if (level <= 5) {
            weight = 2 * tagArray.length;
        } else if (level <= 10) {
            weight = 3 * tagArray.length;
        } else {
            result.message = userCode.ERROR_FORM_DATA;
            ctx.body = result;
            return;
        }

        //先完成成功返回，后续异步运行
        result.success = true;
        ctx.body = result;

        let managerId = await pictureService.getManagerIdOfPicture(body.pictureId);

        labelService.addPictureLabel(body.id, body.pictureId, tagArray, weight, managerId);
        // await labelService.addPictureLabel(body.id, body.pictureId, body.label, weight);

        //更新picture对应的type
        pictureService.updatePictureType(body.pictureId)

        //更新picture对应的acceptLabel
        pictureService.updatePictureAcceptedLabel(body.pictureId)

        //更新user对应的type
        userInfoService.updateUserType(body.id)

        //用户积分加一
        userInfoService.plusUserScore(body.id, tagArray.length);

        let newScore = await userInfoService.getScoreByUserId(body.id);

        console.log("newScore:" + newScore);

        if (config.scoreLevel[level + 1] <= newScore) {
            userInfoService.plusUserLevel(body.id);
        }
        //picture的被打标签次数加一
        // pictureService.labelOnece(body.pictureId);

        // result.success = true;


        // ctx.body = result
    },

    /**
     * 更新用户头像
     * @param   {obejct} ctx 上下文对象
     */
    async updateUserAvatar(ctx) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }

        let tokenStatus = await accessTokenService.isLoged(formData);
        if (tokenStatus === 1) {


            let updateResult = await userInfoService.updateUserAvatar(formData);
            if (updateResult) {
                // result.data = userInfo
                result.code = 1111;
                result.success = true
            } else {
                result.message = userCode.ERROR_SYS;
            }
        } else if (tokenStatus === 0) {
            result.code = 9999;
            result.message = userCode.FAIL_TOKEN_TIME;
        } else {
            // TODO
            result.code = 0000;
            result.message = userCode.FAIL_USER_NO_LOGIN;
        }

        ctx.body = result
    },



    /**
     * 拿到历史打过的标签
     * @param  {obejct} ctx 上下文对象

     * 得到指定数量的picture数据

     */
    async getHistoryLabel(ctx) {



        let body = ctx.request.body;
        let result = {
            success: false,
            message: '',
            data: {
                labelList: []
            },
            code: ""
        }

        let limit = body.limit || 20;

        let page = body.page || 1;

        let labelList = await labelService.getHistoryLabel(body.id, limit, page)





        result.success = true;
        result.data.labelList = labelList
        ctx.body = result;
    },




}