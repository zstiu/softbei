var tencentyoutuyun = require('./imageTag');
let config = require('../config.js');
var conf = tencentyoutuyun.conf;
var youtu = tencentyoutuyun.youtu;

// 设置开发者和应用信息, 请填写你在开放平台
var appid = config.imagetag.appid;
var secretId = config.imagetag.secretId;
var secretKey = config.imagetag.secretKey;
var userid = '****';

conf.setAppInfo(appid, secretId, secretKey, userid, 0);

let imageTag = function(imageUrl) {

    return new Promise((resolve, reject) => {

        youtu.imagetag(imageUrl, function(data) {
            resolve(JSON.stringify(data));
        });
        //{"httpcode":200,"code":200,"message":"HTTP OK","data":{"errorcode":0,"e
        // rrormsg":"OK","tags":[{"tag_name":"天空","tag_confidence":15},{"tag_name":"汽车"
        // ,"tag_confidence":77},{"tag_name":"海报","tag_confidence":25}],"faces":[]}}


    })

}

export default imageTag;


// youtu.imagetag('https://threejs.org/files/projects/mustang.png', function(data) {
//     console.log("imagetag:" + JSON.stringify(data));
// });

//youtu.idcardocr('a.jpg', 0, function(data){
//    console.log("idcardocr:" + JSON.stringify(data));
//});

//youtu.namecardocr('a.jpg', false, function(data){
//    console.log("namecardocr:" + JSON.stringify(data));
//});

// 其他接口 类似