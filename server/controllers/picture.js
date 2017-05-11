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
        console.log(typeof allPicture);
        // console.log(allPicture);
        for (let tag = 0; tag < allPicture.length; tag++) {
            allPicture[tag].path = config.imageHost + allPicture[tag].path;
            result.data.push(allPicture[tag]);
        }

        let watchingPictureResult = userService.watchingPicture(body.id, limit);

        // let validateResult = await userInfoService.exitPhone(formData);

        // if (validateResult.success === false) {
        //     result = validateResult
        //     ctx.body = result
        //     return
        // }



        result.success = true;
        // result.code = "1111";

        // // result.message = userCode.ERROR_SYS


        ctx.body = result
            // return result
    },




}