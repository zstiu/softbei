/**
 * 用户业务操作
 */

const validator = require('validator')
const pictureModel = require('./../models/picture')
const tokenModel = require('./../models/access-token')
const userCode = require('./../codes/user')

const picture = {

    /**
     * 数据库新加图片数据
     * @param  {object} picture 用户信息
     * @return {object}      创建结果
     */
    async create(picture) {
        picture.uploadTime = new Date().getTime();
        let result = await pictureModel.create(picture)
        return result
    },

    /**
     * 得到指定数量的picture数据
     * @param  {string} minId 用户浏览到的pictureID
     * @param  {string} limit 限制的查询条数
     * @return {object|null}     查找结果
     */
    async getPicture(minId, limit) {

        let getPicture = await pictureModel.getPicture(minId, limit);

        // let result = await dbUtils.findDataByPage("picture", "*", minId, minId)
        // if (Array.isArray(result) && result.length > 0) {
        //     result = result[0]
        // } else {
        //     result = null
        // }
        return getPicture
    },

    /**
     * 给一个picture打了一次picture
     * @param  {string} minId 用户浏览到的pictureID
     * @param  {string} limit 限制的查询条数
     * @return {object|null}     查找结果
     */
    async labelOnece(pictureId) {

        let getPicture = await pictureModel.plusLabelNumber(pictureId);

        // let result = await dbUtils.findDataByPage("picture", "*", minId, minId)
        // if (Array.isArray(result) && result.length > 0) {
        //     result = result[0]
        // } else {
        //     result = null
        // }
        return getPicture
    },

}

module.exports = picture