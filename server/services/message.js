/**
 * 用户业务操作
 */

const validator = require('validator')
const messageModel = require('./../models/message')
const tokenModel = require('./../models/access-token')
const userCode = require('./../codes/user')
const uuidV4 = require('uuid/v4');

const message = {

    /**
     * 新加message数据
     * @param  {object} model 用户数据模型
     * @return {object}       mysql执行结果
     */
    async create(userId, managerId, type, title, messageInfo) {
        let message = {
            userId: userId,
            managerId: managerId,
            created_time: new Date().getTime(),
            type: type || '系统',
            title: title,
            message: messageInfo,
            isWatched: 0
        }
        let result = await messageModel.create(message);
        return result
    },

    /**
     * 查找用户的message
     * @param  {obejct} options 查找条件参数
     * @return {object|null}        查找结果
     */
    async getUserMessage(userId) {
        let message = await messageModel.getUserMessage(userId);

        return message
    },
}

module.exports = message