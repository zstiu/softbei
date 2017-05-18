const allConfig = require("./../../config")
var http = require('http');
var https = require('https');




/**
 * 得到词语的词向量  或者两个词的相似度
 * 返回结果：相似度时：{"sim":{"sim":0.295162},"vec":null}
 * 词向量时：{"sim":null,"vec":{"vec":[-0.0568167,0.0252414,-0.0952354,-0.0492443,-0.0273178,
-0.0264681,-0.119178,0.01235,0.0436546,0.095547,0.0161026,-0.0753819,-0.0931663,
0.166212,-0.025632,-0.0334239,0.0175194,-0.171516,-0.0808243,0.111464,-0.0696913
,-0.0207315,0.119533,0.0023751,0.00123423,0.0253041,-0.0168433,-0.0046805,0.0603
908,-0.131342,0.120978,-0.103053,-0.0770704,0.0573579,-0.150643,0.0125237,0.0075
6317,0.103695,0.0119887,0.0482235,-0.145544,-0.106162,-0.00638346,0.0450901,-0.0
921489,-0.0801847,0.00983722,-0.0496027,-0.0492922,-0.00533185,-0.0282601,-0.028
4393,-0.0294712,0.0315702,-0.022059,0.00465764,0.0851386,0.0420732,0.119907,-0.0
314059,-0.0043707,-0.113943,-0.126238,-0.0304429,0.00148474,0.106745,-0.0936008,
0.00310041,0.00884314,-0.214648,0.0332402,-0.0686287,-0.0223866,0.03521,-0.01363
97,-0.0853665,-0.0591902,-0.00232465,-0.0617343,0.11472,0.0105218,-0.0349547,-0.
119199,-0.0226386,-0.0125138,-0.0247908,0.0203382,0.0534848,-0.0900448,0.134421,
-0.0204655,-0.0727164,0.0546093,0.0538461,-0.0712047,-0.0532347,-0.172217,-0.017
3578,0.0688229,-0.0113351,-0.0131002,0.0938802,-0.0626754,-0.0344516,-0.0295528,
-0.0767363,-0.0852289,-0.0909652,0.136182,-0.0485258,-0.158247,-0.137147,-0.1232
64,0.0769889,-0.0927781,-0.0655714,0.0524952,-0.041057,0.0620158,0.00822024,-0.0
0223164,-0.0545157,-0.0121802,-0.000568973,0.0492898,-0.00945183,-0.0695719,-0.0
124848]}}
 */
let getWordembedding = function(...rest) {

    let reqBodyObj = {
        query1: arguments[0],
        // tid: 2
    };
    //     var reqBody = `{
    //     "query1":"百度",
    //     "query2":"谷歌",
    //     "tid":1
    //   }`
    // console.log(reqBody);



    switch (arguments.length) {
        case 1:
            // console.log("arguments has 1")
            reqBodyObj.tid = 2
            break;
        case 2:
            reqBodyObj.tid = 1;
            reqBodyObj.query2 = arguments[1];
            break;
    }

    return new Promise((resolve, reject) => {

        let params = {
            hostname: allConfig.baiduNLP.hostname,
            path: allConfig.baiduNLP.wordembeddingUrl,
            method: 'POST',
            headers: {
                'Content-Type': 'text/json; charset=UTF-8',
                // 'Content-Length': reqBody.length,
            }
        };

        let req = https.request(params, function(response) {

            // console.log("测试点一");

            console.log('STATUS: ' + response.statusCode);
            console.log('HEADERS: ' + JSON.stringify(response.headers));



            var result = '';
            // response.setEncoding('utf8');

            response.on('data', function(chunk) {
                result += chunk;
            });

            response.on('error', function(e) {

            });

            response.on('end', function() {
                resolve(result);
            });

        }); // 
        req.on('error', (e) => {
            console.log(`请求遇到问题: ${e.message}`);
        });
        let reqBody = JSON.stringify(reqBodyObj);
        // console.log(reqBody)
        // req.write();
        req.end(reqBody);

    })

}

// const test = async function() {
//     let result = await getWordembedding("家", "门");
//     // console.log(result);
// }

// test()
module.exports = getWordembedding