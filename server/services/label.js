/**
 * 用户业务操作
 */

const validator = require('validator')
const labelModel = require('./../models/label')
const tokenModel = require('./../models/access-token')
const userCode = require('./../codes/user')
const textClassify = require('./../utils/textClassify.js');

const label = {

    /**
     * 数据库新加标签数据
     * @param  {object} model 用户数据模型
     * @return {object}       mysql执行结果
     */
    async addPictureLabel(userId, pictureId, labelArray, weight, managerId) {

        let type = await textClassify(labelArray);

        for (var index = 0; index < labelArray.length; index++) {
            var labelInfo = labelArray[index];
            let label = {
                userId: userId,
                pictureId: pictureId,
                label: labelInfo,
                type: type,
                weight: weight,
                created_time: new Date().getTime(),
                managerId: managerId
            }
            labelModel.create(label)

        }


        return
    },


    /**
     * 通过userId pictureId 取label 用于判断是否重复提交
     * @param  {string} userId 用户id
     * @param  {string} pictureId 图片id
     * @return {object}       mysql执行结果
     */
    async getLabel(userId, pictureId) {

        let result = await labelModel.getLabel(userId, pictureId);
        return result
    },


    /**
     * 通过userId 得到指定数量的历史标签
     * @param  {string} userId 用户id
     * @param  {string} pictureId 图片id
     * @return {object}       mysql执行结果
     */
    async getHistoryLabel(userId, limit, page) {

        let result = await labelModel.getHistoryLabel(userId, limit, page);
        return result
    },


    /**
     * 清除userId打过的历史标签
     * @param  {string} userId 用户id
     * @return {object}       mysql执行结果
     */
    async cleanHistoryLabel(userId) {

        let result = await labelModel.cleanHistoryLabel(userId);
        return result
    },


    /**
     * 通过userId 得到指定数量的历史标签
     * @param  {string} userId 用户id
     * @param  {string} pictureId 图片id
     * @return {object}       mysql执行结果
     */
    async getLabelByUseridPictureid(userId, pictureId) {

        let result = await labelModel.getLabelByUseridPictureid(userId, pictureId);
        return result
    },

}

module.exports = label