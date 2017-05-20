/**
 * 用户业务操作
 */

const validator = require('validator')
const pictureModel = require('./../models/picture')
const tokenModel = require('./../models/access-token')
const userCode = require('./../codes/user')
const imageTag = require('./../utils/imageTag.js');
const config = require('../../config')

const picture = {

    /**
     * 数据库新加图片数据
     * @param  {object} picture 用户信息
     * @return {object}      创建结果
     */
    async create(picture) {
        picture.uploadTime = new Date().getTime();
        //根据pictureUrl，使用图像·识别，加入recognitionLabel与type

        let allPath = config.imageHost + "common/2017/05/10/00a8cf281dca4.jpg" //picture.path

        let tag = await imageTag(allPath)

        console.log(tag);

        let recognitionLabel = "a";

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

    /**
     * 搜索pciture
     * @param  {string} search 查询关键字
     * @param  {number} limit 结果条数
     * @param  {number} page 第几页
     * 得到指定数量的picture数据

     */
    async searchPicture(search, limit, page) {

        //todo:调用词性分析api，文本分词，搜索多个分词
        let result = await pictureModel.searchPicture(search, limit, page);

        // let result = await dbUtils.findDataByPage("picture", "*", minId, minId)
        // if (Array.isArray(result) && result.length > 0) {
        //     result = result[0]
        // } else {
        //     result = null
        // }
        return result
    },



}

module.exports = picture