const pictureService = require('./../services/picture')
const userService = require('./../services/user-info')
const accessTokenService = require('./../services/access-token')
const userCode = require('./../codes/user')
const uuidV4 = require('uuid/v4');
const config = require("./../../config");

module.exports = {

    /**
     * 取pciture
     * @param  {obejct} ctx 上下文对象

     * 得到指定数量的picture数据

     */
    async getPicture(ctx) {



        let body = ctx.request.body;
        let result = {
            success: false,
            message: '',
            data: [],
            code: ""
        }

        //需要得到用户pictureID，取id大于pictureId的picture
        //默认20个picture
        //TODO: 过滤不符合用户喜好的图片

        // console.log("到达");
        let pictureIdResult = await userService.getPictureidByUserId(body.id);
        if (pictureIdResult) {
            var pictureId = pictureIdResult.pictureId;
        } else {
            result.message = userCode.ERROR_FORM_DATA
            ctx.body = result;
            return;
        }


        // console.log(pictureId);

        let limit = body.limit;

        // console.log(limit);



        let allPicture = await pictureService.getPicture(pictureId, limit);
        let watchingPictureResult = userService.watchingPicture(body.id, allPicture.length);
        if (allPicture.length < limit) { //当pictureId到尾部时，随机从前面取缺少的值补充
            let randomId = Math.random;
            let randomPicture = await pictureService.getPicture(pictureId, limit - allPicture.length);
            for (let tag of randomPicture) {
                allPicture.push(tag);
            }
        }
        console.log(typeof allPicture);
        // console.log(allPicture);
        for (let tag = 0; tag < allPicture.length; tag++) {
            allPicture[tag].path = config.imageHost + allPicture[tag].path;
            result.data.push(allPicture[tag]);
        }

        result.success = true;
        ctx.body = result;
    },


    /**
     * 搜索pciture
     * @param  {obejct} ctx 上下文对象

     * 得到指定数量的picture数据

     */
    async searchPicture(ctx) {



        let body = ctx.request.body;
        let result = {
            success: false,
            message: '',
            data: [],
            code: ""
        }



        // console.log(pictureId);
        let search = body.search;
        let limit = body.limit;
        let page = body.page;


        let allPicture = await pictureService.searchPicture(search, limit, page);
        for (let tag = 0; tag < allPicture.length; tag++) {
            allPicture[tag].path = config.imageHost + allPicture[tag].path;
            result.data.push(allPicture[tag]);
        }

        if (allPicture.length < limit) {
            result.code = "0010";
            result.message = userCode.NO_SEARCH_PICTURE;
        }

        result.success = true;

        ctx.body = result;
    },




}