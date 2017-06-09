/**
 * 用户业务操作
 */

const validator = require('validator')
const pictureModel = require('./../models/picture')
const tokenModel = require('./../models/access-token')
const userCode = require('./../codes/user')
const imageTag = require('./../utils/imageTag.js');
const textClassify = require('./../utils/textClassify.js');
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

        let allPath = config.imageHost + picture.path;
        // let allPath = "http://115.159.26.94:9001/" + picture.path;

        console.log(allPath);

        // let tags = (await imageTag(allPath)).data.tags

        // console.log(typeof tags);

        let recognitionLabel = await imageTag(allPath)

        let type = await textClassify(recognitionLabel);

        // while (recognitionLabel == "[]") {
        //     recognitionLabel = await imageTag(allPath);
        // }

        console.info("识别出的标签" + recognitionLabel);
        console.info("识别出的type" + type);

        picture.recognitionLabel = recognitionLabel;

        picture.type = type;

        let result = await pictureModel.create(picture)
        return result
    },

    /**
     * 得到指定数量的picture数据
     * @param  {string} minId 用户浏览到的pictureID
     * @param  {string} limit 限制的查询条数
     * @return {object|null}     查找结果
     */
    async getPicture(minId, type, limit) {

        let getPicture = await pictureModel.getPicture(minId, type, limit);

        // let result = await dbUtils.findDataByPage("picture", "*", minId, minId)
        // if (Array.isArray(result) && result.length > 0) {
        //     result = result[0]
        // } else {
        //     result = null
        // }
        return getPicture
    },

    /**
     * 给一个picture打了n次标签
     * @param  {string} minId 用户浏览到的pictureID
     * @param  {string} limit 限制的查询条数
     * @return {object|null}     查找结果
     */
    async labeled(pictureId, n) {

        let getPicture = await pictureModel.labeled(pictureId, n);

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

    /**
     * 通过pictureId,查询label表中已打最多的三个标签type,更新picture表的type
     * @param  {string} pictureId 图片id
     * @return {object}       mysql执行结果
     */
    async updatePictureType(pictureId) {

        let selectResult = await pictureModel.getMostTypeInLabel(pictureId);

        let newType = '';

        if (selectResult.length > 0) {
            for (var index = 0; index < selectResult.length - 1; index++) {
                newType = newType + selectResult[index].type + ",";
            }
            newType = newType + selectResult[index].type;
        }


        let result = await pictureModel.updatePictureType(pictureId, newType)

        return result
    },


    /**
     * 通过pictureId,查询label表中已打最多的三个超过20的标签,更新picture表的acceptedLabel
     * @param  {string} pictureId 图片id
     * @return {object}       mysql执行结果
     */
    async updatePictureAcceptedLabel(pictureId) {

        let selectResult = await pictureModel.getMostLabelNameInLabel(pictureId);

        let newLabel = '';

        if (selectResult.length > 0) {
            for (var index = 0; index < selectResult.length - 1; index++) {
                newLabel = newLabel + selectResult[index].label + ",";
            }
            newLabel = newLabel + selectResult[index].label;
        }


        let result = await pictureModel.updatePictureAcceptedLabel(pictureId, newLabel)

        return result
    },

    /**
     * 得到指定数量的随机picture数据
     * @param  {string} minId 用户浏览到的pictureID
     * @param  {string} limit 限制的查询条数
     * @return {object|null}     查找结果
     */
    async getRandomPicture(limit) {

        let getPicture = await pictureModel.getRandomPicture(limit);

        return getPicture
    },

    /**
     * 得到指定picture的managerId
     * @param  {number} id 用
     * @return {object|null}     查找结果
     */
    async getManagerIdOfPicture(id) {

        let managerIdResult = await pictureModel.getManagerIdOfPicture(id);

        let managerId = managerIdResult[0].managerId

        // let result = await dbUtils.findDataByPage("picture", "*", minId, minId)
        // if (Array.isArray(result) && result.length > 0) {
        //     result = result[0]
        // } else {
        //     result = null
        // }
        return managerId
    },


    /**
     * 通过id得到指定picture
     * @param  {number} id 用
     * @return {object|null}     查找结果
     */
    async getPictureById(id) {

        let pictureResult = await pictureModel.getPictureById(id);

        let picture = pictureResult[0]

        // let result = await dbUtils.findDataByPage("picture", "*", minId, minId)
        // if (Array.isArray(result) && result.length > 0) {
        //     result = result[0]
        // } else {
        //     result = null
        // }
        return picture
    },



    /**
     * 通过type得到pciture
     * @param  {string} type 类型
     * @param  {number} limit 结果条数
     * @param  {number} page 第几页
     * 得到指定数量的picture数据

     */
    async getPictureByType(type, limit, page) {

        //todo:调用词性分析api，文本分词，搜索多个分词
        let result = await pictureModel.getPictureByType(type, limit, page);

        // let result = await dbUtils.findDataByPage("picture", "*", minId, minId)
        // if (Array.isArray(result) && result.length > 0) {
        //     result = result[0]
        // } else {
        //     result = null
        // }
        return result
    },

    /**
     * 得到id对应的管理员所有已上传图片的信息（用于在web端查看任务进度）
     * @param  {string} type 类型
     * @param  {number} limit 结果条数
     * @param  {number} page 第几页
     * 得到指定数量的picture数据

     */
    async getAllPictureInfo(id) {

        //todo:调用词性分析api，文本分词，搜索多个分词
        let result = await pictureModel.getAllPictureInfo(id);

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