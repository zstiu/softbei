/**
 * 用户业务操作
 */

const validator = require('validator')
const managerModel = require('./../models/manager')
const tokenModel = require('./../models/access-token')
const pictureModel = require('./../models/picture')
const userCode = require('./../codes/user')
const path = require('path')
const upload = require('./../utils/upload')
const Busboy = require('busboy');
const inspect = require('util').inspect

const manager = {

    /**
     * 创建用户
     * @param  {object} user 用户信息
     * @return {object}      创建结果
     */
    async createManager(manager) {
        let result = await managerModel.createManager(manager);
        return result;
    },


    /**
     * 新建与改管理员关联的数据表，用于存储上传图片  表名强制为manager-${managerId}
     */
    // async createManagerTable(table) {
    //     let options = {
    //         colume: [{
    //                 name: "id",
    //                 limit: "int(11) NOT NULL"
    //             },
    //             {
    //                 name: "imageUrl",
    //                 limit: "varchar(255) NOT NULL"
    //             },
    //             {
    //                 name: "browsed",
    //                 limit: "int(11) NOT NULL DEFAULT '0' COMMENT '被浏览几次'"
    //             },
    //             {
    //                 name: "lable",
    //                 limit: "varchar(255) DEFAULT NULL COMMENT '已经被确定的标签，以逗号隔开'"
    //             },
    //             {
    //                 name: "upload_time",
    //                 limit: "varchar(20) NOT NULL"
    //             },
    //             {
    //                 name: "completed",
    //                 limit: "int(1) NOT NULL DEFAULT '0' COMMENT '是否已完成'"
    //             }
    //         ],
    //         property: [
    //             "PRIMARY KEY (`id`)"
    //         ]
    //     }
    //     let result = await managerModel.createManagerTable(table, options);
    //     return result;
    // },

    /**
     * 查找存在用户信息
     * @param  {object} formData 查找的表单数据
     * @return {object|null}      查找结果
     */
    async getExistOne(formData) {
        let resultData = await managerModel.getExistOne({
            'email': formData.email,
            'name': formData.name,
            "phone": formData.phone
        })
        return resultData
    },

    /**
     * 本业务内登录操作
     * @param  {object} formData 登录表单信息
     * @return {object}          登录业务操作结果
     */
    async signIn(formData) {
        let resultData = await managerModel.getOneByManagerNameAndPassword({
            'password': formData.password,
            'name': formData.name
        })

        return resultData
    },


    /**
     * 更新用户信息
     * @param {object} user 
     */
    // async updateUserInfo(user) {
    //     let result = await userModel.updateUserInfo(user);
    //     return result;
    // },


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
    async getManagerInfoByManagerName(managerName) {

        let resultData = await managerModel.getManagerInfoByManagerName(managerName) || {};
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
     * @param  {object} manager 用户注册数据
     * @return {object}          校验结果
     */
    async validatorSignUp(manager) {
        let result = {
            success: false,
            message: '',
            data: null,
            code: ""
        }

        if (/[a-z0-9\u4e00-\u9fa5\_\-]{1,10}/.test(manager.name) === false) {
            result.message = userCode.ERROR_USER_NAME
            return result
        }
        if (typeof manager.email === String) {
            if (!validator.isEmail(manager.email)) {
                result.message = userCode.ERROR_EMAIL
                return result
            }
        }
        if (!/[\w+]{6,16}/.test(manager.password)) {
            result.message = userCode.ERROR_PASSWORD
            return result
        }
        if (manager.password !== manager.confirmPassword) {
            result.message = userCode.ERROR_PASSWORD_CONFORM
            return result
        }

        result.success = true

        return result
    },



    /**
     * 上传图片
     * @param  {object} ctx 上下文
     * @return {object}          上传结果
     */
    async uploadPicture(ctx) {
        // let result = {
        //         success: false,
        //         message: '',
        //         data: null,
        //         code: ""
        //     }
        // let serverFilePath = path.join(__dirname, 'static/image')

        let result = await upload.uploadPicture(ctx, {
            pictureType: 'common',
            // path: serverFilePath
        })
        console.log("managerService:" + result.data.pictureUrl);
        result.success = true

        return result
    },

    /**
     * 检验上传信息中的管理员认证
     * @param  {string} managerName 用户账号名称
     * @return {object|null}     查找结果
     */
    async uploadLoged(req) {

        return new Promise((resolve, reject) => {
            let busboy = new Busboy({ headers: req.headers })

            let formData = {
                managerId: "",
                token: ""
            };

            busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
                console.log('Field-field [' + fieldname + ']: value: ' + inspect(val))
                formData[fieldname] = val;
            })
            busboy.on('finish', function() {
                console.log('Done parsing form!');
                // console.log(result.data.managerId);
                resolve(formData);
            })

            // resolve(formData);
            req.pipe(busboy);
        });

    },



}

module.exports = manager