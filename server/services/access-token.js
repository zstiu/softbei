/**
 * token业务操作
 */

const validator = require('validator')
const tokenModel = require('./../models/access-token')
const userCode = require('./../codes/user')

const token = {

    /**
     * 创建token
     * @param  {object} user 用户信息
     * @return {object}      创建结果
     */
    async create(token) {
        let result = await tokenModel.create(token);
        return result;
    },

    /**
     * 取得相应用户已登录token
     * @param {object} user 
     */
    async getToken(user) {
        let result = await tokenModel.getToken(user);
        return result;
    },

    /**
     * 删除相应token
     * @param {object} user 
     */
    async delete(user) {
        let　 result = await tokenModel.delete(user)
        return result;
    },


    /**
     * 检验用户登录状态
     * @param {object} user 
     */
    async isLoged(user) {
        let token = await tokenModel.getToken(user);
        if (token === 0) {
            console.log("缺省字段");
            return -2;
        }
        console.log(token.length);
        if (token[0] && token[0].accessToken === user.token) {
            if (token[0].deadline < new Date().getTime()) {
                console.log("登录状态已过期");
                return 0;
            } else {
                console.log("用户登录状态以及token正确");
                return 1;
            }

        } else {
            console.log("用户未登录");
            return -1;
        }
    }



}

module.exports = token;