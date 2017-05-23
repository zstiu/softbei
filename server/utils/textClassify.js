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

capi.request({
    Region: 'gz',
    Action: 'TextClassify',
    content: '截图'
}, function(error, data) {
    console.log(data)
})

//传入配置以覆盖默认项
// capi.request({
//     Region: 'gz',
//     Action: 'LexicalAnalysis',
//     content: 'otherParam'
// }, {
//     serviceType: 'cvm'
// }, function(error, data) {
//     console.log(data)
// })

//生成 querystring
var qs = capi.generateQueryString({
    Region: 'gz',
    Action: 'TextClassify',
    content: 'otherParam'
}, {
    serviceType: 'cvm'
});
console.log(qs)
    //'Region=gz&SecretId=&Timestamp=
    // 1449461969&Nonce=20874&Action=DescribeInstances&otherParam=otherParam&Signature=r%2Fa9nqMxEIn5RsMjqmIksQ5XcYc%3D'