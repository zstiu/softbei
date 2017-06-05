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
            data: {
                pictureList: []
            },
            code: ""
        }

        //需要得到用户pictureID，取id大于pictureId的picture
        //默认20个picture
        //TODO: 过滤不符合用户喜好的图片

        // console.log("到达");
        let pictureIdResult = await userService.getPictureidByUserId(body.id);
        let pictureId;
        if (pictureIdResult) {
            pictureId = pictureIdResult.pictureId;
        } else {
            result.message = userCode.ERROR_FORM_DATA
            ctx.body = result;
            return;
        }


        // console.log(pictureId);

        let limit = body.limit;

        // console.log(limit);

        let typeString = await userService.getType(body.id)

        let type = typeString.split(",");

        console.log(type)

        console.log("pictureId:" + pictureId);

        let allPicture = await pictureService.getPicture(pictureId, type, limit);

        let lastPictureId = allPicture[allPicture.length - 1].id;


        let watchingPictureResult = userService.watchingPicture(body.id, lastPictureId);


        if (allPicture.length < limit) { //当pictureId到尾部时，随机从前面取缺少的值补充
            // let randomId = Math.random;
            let randomPicture = await pictureService.getRandomPicture(limit - allPicture.length);
            for (let tag of randomPicture) {
                allPicture.push(tag);
            }
        }
        // console.log(typeof allPicture);
        // console.log(allPicture);
        for (let tag = 0; tag < allPicture.length; tag++) {
            allPicture[tag].path = config.imageHost + allPicture[tag].path;
            result.data.pictureList.push(allPicture[tag]);
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
            data: {
                pictureList: []
            },
            code: ""
        }



        // console.log(pictureId);
        let search = body.search;
        let limit = body.limit;
        let page = body.page;


        //检验数据是否正常
        if (limit <= 0 || page <= 0) {
            result.message = userCode.ERROR_FORM_DATA
            ctx.body = result;
            return
        }


        let allPicture = await pictureService.searchPicture(search, limit, page);
        for (let tag = 0; tag < allPicture.length; tag++) {
            allPicture[tag].path = config.imageHost + allPicture[tag].path;
            result.data.pictureList.push(allPicture[tag]);
        }

        if (allPicture.length < limit) {
            result.code = "0010";
            result.message = userCode.NO_SEARCH_PICTURE;
        }

        result.success = true;

        ctx.body = result;
    },



    /**
     * 根据id得到相应pciture
     * @param  {obejct} ctx 上下文对象

     * 得到指定数量的picture数据

     */
    async getPictureById(ctx) {



        let body = ctx.request.body;
        let result = {
            success: false,
            message: '',
            data: {

            },
            code: ""
        }

        let id = body.id;


        let picture = await pictureService.getPictureById(id);

        if (picture) {
            picture.path = config.imageHost + picture.path;
            result.success = true;
            result.data = picture;
        } else {
            result.success = false;
            result.code = "0000";
            result.message = userCode.FAIL_GET_NO_DATA;
        }



        ctx.body = result;
    },


}