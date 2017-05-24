const config = {

    imageRecognition: { //腾讯图像识别api

        AppId: "10083287",
        SecretId: "AKIDTWSUYfedS9g9c6D8arxzBGDxUr1yQGfr",
        SecretKey: "74ufQ3UiniRyHOJ1Yw89xYw99wWv8GIQ"

    },

    wenzhi: {
        AppId: "1253103285",
        SecretId: "AKIDiMp7E9fZ9YmphiQaUEnDRl8ZwDTYnK1X",
        SecretKey: "VpzylWKk6rbBZyIQMBsNkwyufHk3OfRH"
    },

    rememberImageType: [ //所有使用到的分类
        //左边数据库保存，右边app显示
        "其他", //0其他
        "动物", //1动物
        "风景", //"旅游", //2风景
        "建筑", //"房产", //3建筑
        "健康", //4健康
        "人物", //5人物
        "生活", //6生活
        "体育", //7体育
        "文化", //8文化
        "学术", //9学术 改为->教育
        "娱乐", //10娱乐
        "植物", //11植物
    ],

    imageType: [ //腾讯文智文本分类，所有分类
        "其他", // E_PTC_CATEGORY_UNKNOWN	0X00000000	未知分类
        "风景", // E_PTC_CATEGORY_TRAVEL	0X00000001	旅游
        "娱乐", // E_PTC_CATEGORY_GAMES	0X00000002	游戏
        "人物", // E_PTC_CATEGORY_CHARACTERS	0X00000003	人物
        "体育", // E_PTC_CATEGORY_SPORTS	0X00000004	体育
        "娱乐", // E_PTC_CATEGORY_MUSIC	0X00000005	音乐
        "娱乐", // E_PTC_CATEGORY_MOVIE	0X00000006	影视
        "娱乐", // E_PTC_CATEGORY_SOFTWARE	0X00000007	软件
        "学术", // E_PTC_CATEGORY_LITERATURE	0X00000008	文学
        "生活", // E_PTC_CATEGORY_FOOD	0X00000009	美食
        "健康", // E_PTC_CATEGORY_INTERACTION_HEALTH	0X0000000A	健康
        "健康", // E_PTC_CATEGORY_INTERACTION_MEDICINE	0X0000000B	医药
        "其他", // E_PTC_CATEGORY_RETAILSHOP	0X0000000C	商铺
        "其他", // E_PTC_CATEGORY_FINANCE	0X0000000D	财经
        "其他", // E_PTC_CATEGORY_CAR	0X0000000E	汽车
        "建筑", // E_PTC_CATEGORY_HOUSE	0X0000000F	房产
        "娱乐", // E_PTC_CATEGORY_COMIC	0X00000010	动漫
        "教育", // E_PTC_CATEGORY_INTERACTION_EDUCATION	0X00000011	教育学校、学科、考试，培训等
        "其他", // E_PTC_CATEGORY_TECHNOLOGY	0X00000012	科技
        "其他", // E_PTC_CATEGORY_MILITARY	0X00000013	军事
        "其他", // E_PTC_CATEGORY_WEATHER	0X00000014	天气
        "其他", // E_PTC_CATEGORY_EMOTION	0X00000015	情感
        "其他", // E_PTC_CATEGORY_INTERACTION_ADVERTISE	0X00000016	广告
        "其他", // E_PTC_CATEGORY_SOCIAL_ASSEMBLE	0X00000017	群体聚集
        "其他", // E_PTC_CATEGORY_SOCIAL_DISASTER	0X00000018	自然灾害
        "其他", // E_PTC_CATEGORY_SOCIAL_ACCIDENT	0X00000019	交通事故
        "其他", // E_PTC_CATEGORY_SOCIAL_OFFENSE	0X0000001A	刑事犯罪
        "其他", // E_PTC_CATEGORY_SOCIAL_FORCE	0X0000001B	暴力执法
        "其他", // E_PTC_CATEGORY_INTERACTION_JOB	0X0000001C	求职招聘
        "生活", // E_PTC_CATEGORY_SOCIAL_FOODSAFETY	0X0000001D	食品安全
        "其他", // E_PTC_CATEGORY_SOCIAL_POLLUTION	0X0000001E	环境污染
        "健康", // E_PTC_CATEGORY_SOCIAL_EPIDEMIC	0X0000001F	疾病疫情
        "其他", // E_PTC_CATEGORY_SOCIAL_FINANCE	0X00000020	金融安全
        "其他", // E_PTC_CATEGORY_POLITICAL_SENSITIVE	0X00000021	敏感政治
        "其他", // E_PTC_CATEGORY_POLITICAL_CORRUPTION	0X00000022	贪腐
        "其他", // E_PTC_CATEGORY_POLITICAL_CULT	0X00000023	非法组织
        "其他", // E_PTC_CATEGORY_POLITICAL_REACTION	0X00000024	反动言论
        "其他", // E_PTC_CATEGORY_POLITICAL_MODEL	0X00000025	先进事迹
        "其他", // E_PTC_CATEGORY_POLITICAL_LEADER_ACTIVITY	0X00000026	领导人活动
        "其他", // E_PTC_CATEGORY_POLITICAL_POLICY	0X00000027	政策方针
        "其他", // E_PTC_CATEGORY_INTERACTION_INSPIRATION	0X00000028	心灵鸡汤
        "其他", // E_PTC_CATEGORY_SOCIAL_OTHER	0X00000029	其他社会类
        "其他", // E_PTC_CATEGORY_POLITICAL_OTHER	0X0000002A	其它政治类
        "其他", // E_PTC_CATEGORY_PORN_ADVERTISE	0X0000002B	色情广告/推广
        "其他", // E_PTC_CATEGORY_PORN_PROSTITUTION	0X0000002C	色情从业
        "其他", // E_PTC_CATEGORY_PORN_LITERARY	0X0000002D	色情文学
        "其他", // E_PTC_CATEGORY_ADVERTISE_MARKET	0X0000002E	广告子类营销类
        "其他", // E_PTC_CATEGORY_HUMOR	0X0000002F	幽默搞笑
        "其他", // E_PTC_CATEGORY_POLITICAL_SENSITIVE_LIUSI	0X00000030	敏感政治中六四
        "其他", // E_PTC_CATEGORY_POLITICAL_SENSITIVE_LEADER	0X00000031	敏感政治中领导人
        "其他", // E_PTC_CATEGORY_POLITICAL_SENSITIVE_IDEOLOGY	0X00000032	敏感政治中意识形态
        "其他", // E_PTC_CATEGORY_PORN_RESOURCE	0X00000033	色情资源
        "其他", // E_PTC_CATEGORY_ILLEGAL_BLACKINDUSTRY	0X00000034	违法犯罪之网络黑产
        "健康", // E_PTC_CATEGORY_ILLEGAL_DRUG	0X00000035	违法犯罪之毒品
        "其他", // E_PTC_CATEGORY_ILLEGAL_GAMBLE	0X00000036	违法犯罪之赌博
        "娱乐", // E_PTC_CATEGORY_ENTERTAINMENT_STAR	0X00000037	娱乐明星
        "娱乐", // E_PTC_CATEGORY_CONSTELLATION	0X00000038	星座
        "生活", // E_PTC_CATEGORY_BABY	0X00000039	亲子
        "人物", // E_PTC_CATEGORY_WOMEN	0X0000003A	女性
        "其他", // E_PTC_CATEGORY_JOB_ADVERTISE	0X0000003B	招聘广告
        "文化", // E_PTC_CATEGORY_RELIGION	0X0000003C	宗教
        "文化", // E_PTC_CATEGORY_CULTURE	0X0000003D	文化
        "其他", // E_PTC_CATEGORY_GLOBE	0X0000003E	环球
        "动物", // E_PTC_CATEGORY_PET	0X0000003F	宠物
        "娱乐", // E_PTC_CATEGORY_INTERNET	0X00000040	互联网
        "娱乐", // E_PTC_CATEGORY_TECHNOLOGY_DIG	0X00000041	数码
        "娱乐", // E_PTC_CATEGORY_TECHNOLOGY_PHONE	0X00000042	手机
        "娱乐", // E_PTC_CATEGORY_TECHNOLOGY_SOFTWARE	0X00000043	软件
        "其他", // E_PTC_CATEGORY_TECHNOLOGY_NETSECURITY	0X00000044	网络安全
        "其他", // E_PTC_CATEGORY_TECHNOLOGY_SCIENCE	0X00000045	科学
        "生活", // E_PTC_CATEGORY_TECHNOLOGY_INTELLIGENT	0X00000046	智能化
        "其他", // E_PTC_CATEGORY_FINANCE_STOCK	0X00000047	股票
        "其他", // E_PTC_CATEGORY_FINANCE_FUTURES	0X00000048	期货
        "其他", // E_PTC_CATEGORY_FINANCE_MNGMONEY	0X00000049	理财
        "其他", // E_PTC_CATEGORY_FINANCE_INTERFINANCE	0X0000004A	互联网金融
        "其他", // E_PTC_CATEGORY_FINANCE_FRGEXCHANGE	0X0000004B	外汇
        "其他", // E_PTC_CATEGORY_FINANCE_INVERSTMENT	0X0000004C	投资
        "其他", // E_PTC_CATEGORY_FINANCE_FUND	0X0000004D	基金
        "其他", // E_PTC_CATEGORY_FINANCE_MACROECO	0X0000004E	宏观经济
        "其他", // E_PTC_CATEGORY_FINANCE_BOND	0X0000004F	债券
        "其他", // E_PTC_CATEGORY_FINANCE_BANK	0X00000050	银行
        "其他", // E_PTC_CATEGORY_FINANCE_INSURANCE	0X00000051	保险
        "娱乐", // E_PTC_CATEGORY_MOVIE_FILM	0X00000052	电影
        "娱乐", // E_PTC_CATEGORY_MOVIE_TVPLAY	0X00000053	电视剧
        "娱乐", // E_PTC_CATEGORY_MOVIE_SHOW	0X00000054	综艺节目
        "娱乐", // E_PTC_CATEGORY_DRAMA	0X00000055	戏剧
        "体育", // E_PTC_CATEGORY_SPORTS_BASKETBALL	0X00000056	篮球
        "体育", // E_PTC_CATEGORY_SPORTS_FOOTBALL	0X00000057	足球
        "体育", // E_PTC_CATEGORY_SPORTS_PINGPANG	0X00000058	乒乓球
        "体育", // E_PTC_CATEGORY_SPORTS_BADMITON	0X00000059	羽毛球
        "体育", // E_PTC_CATEGORY_SPORTS_VOLLEYBALL	0X0000005A	排球
        "体育", // E_PTC_CATEGORY_SPORTS_SWIMMING	0X0000005B	游泳
        "生活", // E_PTC_CATEGORY_SPORTS_FITNESS	0X0000005C	健身
        "体育", // E_PTC_CATEGORY_SPORTS_GOLF	0X0000005D	高尔夫
        "体育", // E_PTC_CATEGORY_SPORTS_ATHLETICS	0X0000005E	田径
        "其他", // E_PTC_CATEGORY_HISTORY	0X0000005F	历史
        "其他", // E_PTC_CATEGORY_OTHER	0X0000FFFF	其他
        // "其他", //0
        // "旅游", //1
        // "游戏/影视/动漫/音乐", //2
        // "人物", //3
        // "体育", //4
        // "游戏/影视/动漫/音乐", //5
        // "游戏/影视/动漫/音乐", //6
        // "其他", //7
        // "文学", //8
        // "美食", //9
        // "健康/医药", //10
        // "健康/医药", //11
        // "其他", //12
        // "其他", //13
        // "其他", //14
        // "房产", //15
        // "游戏/影视/动漫/音乐", //16
        // "教育", //17
        //大于17为“其他”
    ],

    baiduNLP: { //百度自然语言处理api
        hostname: "AIP.BAIDUBCE.COM",
        access_token: "24.7447c35cc3122b751cde61f97de5886d.2592000.1497693713.282335-9663505",
        wordembeddingUrl: "/rpc/2.0/nlp/v1/wordembedding?access_token=24.7447c35cc3122b751cde61f97de5886d.2592000.1497693713.282335-9663505" // + this.access_token //词向量api
    },

    scoreLevel: [ //积分与等级的规则
        0, //0级
        25, //1级
        50, //2级
        150, //3级
        300, //4级
        600, //5级
        1500, //6级
        3000, //7级
        8000, //8级
        18000, //9级
        40000 //10级
    ],

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
            // HOST: '115.159.26.94'
    }
}

module.exports = config