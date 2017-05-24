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
    async addPictureLabel(userId, pictureId, labelArray, weight) {

        let type = await textClassify(labelArray);

        for (var index = 0; index < labelArray.length; index++) {
            var labelInfo = labelArray[index];
            let label = {
                userId: userId,
                pictureId: pictureId,
                label: labelInfo,
                type: type,
                weight: weight,
                created_time: new Date().getTime()
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




}

module.exports = label