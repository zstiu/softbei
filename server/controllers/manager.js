// const userInfoService = require('./../services/user-info')
const accessTokenService = require('./../services/access-token')
const managerService = require('./../services/manager')
const pictureService = require('./../services/picture')
const userCode = require('./../codes/user')
const uuidV4 = require('uuid/v4');
const Busboy = require('busboy');
// var multiparty = require('multiparty');

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


        let managerResultByName = await managerService.getManagerInfoByManagerName(formData.name);

        if (managerResultByName) {

            let managerResult = await managerService.signIn(formData)

            if (managerResult) {
                if (formData.name === managerResult.name) {
                    result.success = true
                    let managerInfo = await managerService.getManagerInfoByManagerName(formData.name)
                    if (managerInfo) {
                        result.data = managerInfo;
                        managerInfo.managerId = managerInfo.id;
                        // formDate.id = userInfo.id; //为登录用户
                        let token = await accessTokenService.getToken(managerInfo);
                        if (token[0]) {
                            result.data.token = token[0].accessToken;
                        } else {
                            const access_token = uuidV4();
                            let token = {
                                managerId: managerInfo.id,
                                accessToken: access_token,
                                deadline: new Date().getTime() + (365 * 24 * 60 * 60 * 1000), //过期时间一年
                                type: 1
                            };
                            if (await accessTokenService.create(token)) {
                                result.data.token = access_token;
                            }
                        }

                    }
                    // else {
                    //     result.message = userCode.FAIL_USER_NO_LOGIN
                    // }
                } else {
                    result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
                    result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
                }
            } else {
                result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR';
                result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR;
            }
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


        // let formData = await managerService.uploadLoged(ctx.req);



        let result = {
            success: false,
            message: '',
            data: null,
            code: ""
        }

        let query = ctx.request.query;

        console.log("query: " + ctx.request.querystring);

        let uploadResult = await managerService.uploadPicture(ctx);

        let formData = {
            // managerId: uploadResult.data.managerId,
            // token: uploadResult.data.token
            managerId: query.managerId,
            token: query.token
        }

        console.log("formData.managerId = " + formData.managerId);
        let isLoged = await accessTokenService.isLoged(formData);
        console.log("isLoged = " + isLoged);
        if (isLoged === 1) {
            // let uploadResult = await managerService.uploadPicture(ctx)
            let picture = {
                managerId: query.managerId || "0",
                path: uploadResult.data.pictureUrl,
                planId: query.planId || "0",
            }

            let pictureResult = pictureService.create(picture);

            // let resultDate = await accessTokenService.delete(formData);
            // if (resultDate) {
            result.success = true;
            result.data = picture.path;
            // }
        } else if (isLoged === -1) {
            result.success = false;
            result.code = 'FAIL_USER_NO_LOGIN';
            result.message = userCode.FAIL_USER_NO_LOGIN;
        } else if (isLoged === -2) {
            result.success = false;
            result.code = 'ERROR_FORM_DATA';
            result.message = userCode.ERROR_FORM_DATA;
        } else {
            result.code = 'FAIL_TOKEN_TIME';
            result.message = userCode.FAIL_TOKEN_TIME;
        }







        ctx.body = result
    },


    /**
     * 得到id对应的管理员所有已上传图片的信息（用于在web端查看任务进度）
     * @param   {obejct} ctx 上下文对象
     */
    async getAllPictureInfo(ctx) {
        let body = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: {},
            code: ""
        }

        let pictureResult = await pictureService.getAllPictureInfo(body.managerId);

        result.data = pictureResult;



        ctx.body = result
    },



}