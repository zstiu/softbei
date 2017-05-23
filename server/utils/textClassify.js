var Capi = require('qcloudapi-sdk')
let config = require('../../config.js');

var appid = config.wenzhi.AppId;
var secretId = config.wenzhi.SecretId;
var secretKey = config.wenzhi.SecretKey;
var userid = '****';

//通过构造函数传入的参数将作为默认配置
var capi = new Capi({
    SecretId: secretId,
    SecretKey: secretKey,
    serviceType: 'wenzhi'
})


/**
 * 
 * @param {string} content 要分类的文本
 */
const textClassify = function(content) {

    return new Promise((resolve, reject) => {

        capi.request({
            Region: 'gz',
            Action: 'TextClassify',
            content: content
        }, function(error, data) {
            console.log(data)
                //{ code: 0,
                //   message: '',
                //   codeDesc: 'Success',
                //   classes:
                //    [ { class: '未分类', class_num: 0, conf: 0.333 },
                //      { class: '美食', class_num: 9, conf: 0.333 },
                //      { class: '军事', class_num: 19, conf: 0.333 } ] }
            let classes = data.classes
            let maxConf = 0.333;
            let maxKey = -1;

            //如果大于0.333才可认为正确分类
            for (var key in classes) {
                if (classes[key].conf > maxConf) {
                    maxConf = classes[key].conf;
                    maxKey = key

                }
            }
            if (maxKey >= 0) {
                if (classes[maxKey].class === "未分类") {
                    resolve("其他");
                } else {
                    resolve(classes[maxKey].class)
                }
            } else {
                resolve("其他");
            }
        })


        //{"httpcode":200,"code":200,"message":"HTTP OK","data":{"errorcode":0,"e
        // rrormsg":"OK","tags":[{"tag_name":"天空","tag_confidence":15},{"tag_name":"汽车"
        // ,"tag_confidence":77},{"tag_name":"海报","tag_confidence":25}],"faces":[]}}


    })

}

module.exports = textClassify

//传入配置以覆盖默认项
// capi.request({
//     Region: 'gz',
//     Action: 'TextClassify',
//     content: '[{"tag_name":"建筑","tag_confidence":20},{"tag_name":"房屋","tag_confidence":19},{"tag_name":"街道","tag_confidence":20}]'
// }, function(error, data) {
//     console.log(data)
// })

//生成 querystring
// var qs = capi.generateQueryString({
//     Region: 'gz',
//     Action: 'TextClassify',
//     content: 'otherParam'
// }, {
//     serviceType: 'cvm'
// });
// console.log(qs)
//'Region=gz&SecretId=&Timestamp=
// 1449461969&Nonce=20874&Action=DescribeInstances&otherParam=otherParam&Signature=r%2Fa9nqMxEIn5RsMjqmIksQ5XcYc%3D'