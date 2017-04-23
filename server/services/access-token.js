/**
 * token业务操作
 */

const validator = require('validator')
const tokenModel = require('./../models/access-token')
const userCode = require('./../codes/user')

const token = {

    /**
     * 创建用户
     * @param  {object} user 用户信息
     * @return {object}      创建结果
     */
    async create(token) {
        let result = await tokenModel.create(token);
        return result;
    },



}

module.exports = token;