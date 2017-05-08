// const userInfoService = require('./../services/user-info')
// const accessTokenService = require('./../services/access-token')
const managerService = require('./../services/manager')
const pictureService = require('./../services/picture')
const userCode = require('./../codes/user')
const uuidV4 = require('uuid/v4');
// var multiparty = require('multiparty');

module.exports = {

    /**
     * 登录操作
     * @param  {obejct} ctx 上下文对象
     */
    // async signIn(ctx) {
    //     let formData = ctx.request.body
    //     let result = {
    //         success: false,
    //         message: '',
    //         data: null,
    //         code: ''
    //     }



    //     let userResult = await userInfoService.signIn(formData)

    //     if (userResult) {
    //         if (formData.name === userResult.name) {
    //             result.success = true
    //             let userInfo = await userInfoService.getUserInfoByUserName(formData.name)
    //             if (userInfo) {
    //                 result.data = userInfo;
    //                 // formDate.id = userInfo.id; //为登录用户
    //                 let token = await accessTokenService.getToken(userInfo);
    //                 if (token[0]) {
    //                     result.data.token = token[0].accessToken;
    //                 } else {
    //                     const access_token = uuidV4();
    //                     let token = {
    //                         userId: userInfo.id,
    //                         accessToken: access_token,
    //                         deadline: new Date().getTime() + (365 * 24 * 60 * 60 * 1000), //过期时间一年
    //                         type: 1
    //                     };
    //                     if (await accessTokenService.create(token)) {
    //                         result.data.token = access_token;
    //                     }
    //                 }

    //             }
    //             // else {
    //             //     result.message = userCode.FAIL_USER_NO_LOGIN
    //             // }
    //         } else {
    //             result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
    //             result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
    //         }
    //     } else {
    //         result.code = 'FAIL_USER_NO_EXIST';
    //         result.message = userCode.FAIL_USER_NO_EXIST
    //     }

    //     // if (formData.source === 'form' && result.success === true) {
    //     //     let session = ctx.session
    //     //     session.isLogin = true
    //     //     session.userName = userResult.name
    //     //     session.userId = userResult.id

    //     //     ctx.body = "登录成功"
    //     // } else {
    //     ctx.body = result
    //         // }
    // },

    // /**
    //  * 用户登出操作
    //  * TODO：先检验用户登陆状态，删除token表相应数据
    //  * @param {object} ctx 
    //  */
    // async signOut(ctx) {
    //     let formData = ctx.request.body
    //     let result = {
    //         success: false,
    //         message: '',
    //         data: null,
    //         code: ''
    //     }
    //     if (await accessTokenService.isLoged(formData)) {
    //         let resultDate = await accessTokenService.delete(formData);
    //         if (resultDate) {
    //             result.success = true;
    //         }
    //     } else {
    //         result.code = 'FAIL_USER_NO_LOGIN';
    //         result.message = userCode.FAIL_USER_NO_LOGIN;
    //     }


    //     ctx.body = result

    // },

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

        let validateResult = await managerService.validatorSignUp(formData)

        if (validateResult.success === false) {
            result = validateResult
            ctx.body = result
            return
        }

        let existOne = await managerService.getExistOne(formData)
        console.log(existOne)

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


        let managerResult = await managerService.createManager({
            password: formData.password,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            created_time: new Date().getTime()
        })

        // let managerTable = await managerService.createManagerTable("manager_" + managerResult.id);

        // console.log(userResult)

        if (managerResult && managerResult.insertId * 1 > 0) {
            result.success = true
            result.code = "1111";
        } else {
            result.message = userCode.ERROR_SYS
        }

        ctx.body = result
    },


    /**
     * 上传图片
     * @param   {obejct} ctx 上下文对象
     */
    async uploadPicture(ctx) {
        let req = ctx.request.body;

        // console.log(JSON.stringfy(req));

        let result = {
            success: false,
            message: '',
            data: null,
            code: ""
        }

        let uplaodResult = await managerService.uploadPicture(ctx)

        // console.log(uplaodResult.pictureUrl + "!!!!!!!!");



        let picture = {
            managerId: uplaodResult.data.managerId || "0",
            path: uplaodResult.pictureUrl,
            planId: uplaodResult.data.planId,
        }

        // let form = new multiparty.Form();

        // form.parse(ctx.request, function(err, fields, files) {
        //     picture.managerId = fields.managerId;
        //     picture.planId = fields.planId;
        //     // res.writeHead(200, { 'content-type': 'text/plain' });
        //     // res.write('received upload:\n\n');
        //     // res.end(util.inspect({ fields: fields, files: files }));
        // });

        let pictureResult = await pictureService.create(picture);

        // if (validateResult.success === false) {
        //     result = validateResult
        //     ctx.body = result
        //     console.log(result)
        //     return
        // }





        ctx.body = managerResult
    },


    // /**
    //  * 更新用户信息
    //  * @param {object} ctx 上下文对象 
    //  */
    // async update(ctx) {
    //     let formData = ctx.request.body
    //     let result = {
    //         success: false,
    //         message: '',
    //         data: null,
    //         code: ''
    //     }

    //     let tokenStatus = await accessTokenService.isLoged(formData);
    //     if (tokenStatus === 1) {

    //         let user = {
    //             id: formData.id,
    //             // email: formData.email,
    //             // // password: formData.password,
    //             // major: formData.major || '',
    //             // marked: formData.marked || '',
    //             // name: formData.name,
    //             modified_time: new Date().getTime(),
    //         }

    //         if (formData.name) {
    //             user.name = formData.name;
    //         }

    //         if (formData.email) {
    //             user.email = formData.email;
    //         }

    //         if (formData.major) {
    //             user.major = formData.major;
    //         }

    //         if (formData.marked) {
    //             user.marked = formData.marked;
    //         }


    //         let userInfo = await userInfoService.updateUserInfo(user);
    //         if (userInfo) {
    //             result.data = userInfo
    //             result.success = true
    //         } else {
    //             result.message = userCode.ERROR_SYS;
    //         }
    //     } else if (tokenStatus === 0) {
    //         result.code = 9999;
    //         result.message = userCode.FAIL_TOKEN_TIME;
    //     } else {
    //         // TODO
    //         result.code = 0000;
    //         result.message = userCode.FAIL_USER_NO_LOGIN;
    //     }

    //     ctx.body = result

    // },



    /**
     * 获取用户信息
     * @param    {obejct} ctx 上下文对象
     */
    // async getLoginUserInfo(ctx) {
    //     // let session = ctx.session
    //     // let isLogin = session.isLogin
    //     // let userName = session.userName

    //     // console.log('session=', session)
    //     let userDate = ctx.request.body;

    //     let result = {
    //         success: false,
    //         message: '',
    //         data: null,
    //         code: ''
    //     }
    //     let tokenStatus = await accessTokenService.isLoged(userDate);
    //     if (tokenStatus === 1) {
    //         let userInfo = await userInfoService.getUserInfoByUserName(userDate.name);
    //         if (userInfo) {
    //             result.data = userInfo
    //             result.success = true
    //         } else {
    //             result.message = userCode.ERROR_SYS;
    //         }
    //     } else if (tokenStatus === 0) {
    //         result.code = 9999;
    //         result.message = userCode.FAIL_TOKEN_TIME;
    //     } else {
    //         // TODO
    //         result.code = 0000;
    //         result.message = userCode.FAIL_USER_NO_LOGIN;
    //     }

    //     ctx.body = result
    // },




}