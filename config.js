const config = {

    imageRecognition: { //腾讯图像识别api

        AppId: "10083287",
        SecretId: "AKIDTWSUYfedS9g9c6D8arxzBGDxUr1yQGfr",
        SecretKey: "74ufQ3UiniRyHOJ1Yw89xYw99wWv8GIQ"

    },

    baiduNLP: { //百度自然语言处理api
        hostname: "AIP.BAIDUBCE.COM",
        access_token: "24.7447c35cc3122b751cde61f97de5886d.2592000.1497693713.282335-9663505",
        wordembeddingUrl: "/rpc/2.0/nlp/v1/wordembedding?access_token=24.7447c35cc3122b751cde61f97de5886d.2592000.1497693713.282335-9663505" // + this.access_token //词向量api
    },

    imagerPlus: "http://apicn.imageplusplus.com/analyze?api_key=4197724817ffc185214ad52cfccb8409&api_secret=83e077342e88ea3dbfd900ffb3767916&url=http://115.159.26.94:9001//common//2017//05//10//00a8cf281dca4.jpg",

    imageHost: "http://115.159.26.94:9001/", //图片静态服务器

    imagePath: "",

    port: 3001,

    database: {
        DATABASE: 'softbei',
        USERNAME: 'root',
        PASSWORD: '931010',
        PORT: '3306',
        HOST: 'localhost'
    }
}

module.exports = config