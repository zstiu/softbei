# 软件杯服务端API文档 

> ip地址: 生产/测试环境115.159.26.94   本地：localhost   
> 端口号：3001  
> 根目录： /api  

## 用户模块
> 目录： /user

### 注册 **signUp**
method: -> post
所需数据(标星号为必须字段，下同)
> * name(1到10个字符，中英文或者下划线“_”或“-”)  
> * password  
> * confirmPassword  
> email  
> phone

示例http://115.159.26.94:3001/api/user/signUp
```
    {
    "password": "123456",
    "confirmPassword": "123456",
    "name": "zstiu",
    "email": "zstiu@foxmail.com",
    "phone": "15195891362"
    }

```

成功时返回
```
{
  "success": true,
  "message": "",
  "data": null,
  "code": "1111"
  }
```
失败时返回
```
  {
  "success": false,
  "message": "邮箱已被注册",
  "data": null,
  "code": ""
  }
```
* 根据success字段判断是否成功
* 根据message字段标识失败原因


### 登录  **signIn**
method: -> post
所需数据
> * name  
> * password  

示例http://115.159.26.94:3001/api/user/signIn
```
  {
  "password": "123456",
  "name": "zstiu"
  }

```

成功时返回
```
  {
  "success": true,
  "message": "用户登录成功",
  "data":
    {
      "id": 3,
      "email": "zstiu@foxmail.com",
      "name": "zstiu",
      "avatarUrl": null,
      "sex": null,
      "birthday": null,
      "major": null,
      "marked": null,
      "introduction": null,
      "create_time": "1492958357022",
      "modified_time": null,
      "score": 0,
      "level": 0,
      "phone": "15195891362",
      "token": "c38fff51-90ad-46c6-9fde-182020c4f2e5"
    },
  "code": ""
  }
```
失败时返回
```
  {
  "success": false,
  "message": "用户不存在",
  "data": null,
  "code": "FAIL_USER_NO_EXIST"
  }
```

* 根据success字段判断是否成功
* 根据message字段标识失败原因

### 登出  **signOut**
method: -> post
所需数据
> * id   
> * token(登录时服务端返回数据)

示例http://115.159.26.94:3001/api/user/signOut
```
{
"id": "4",  
"token": "64c05c83-d850-49a9-8037-3f99591b25cc"
}


```

成功时返回
```
  {
  "success": true,
  "message": "",
  "data": null,
  "code": ""
  }
```
失败时返回
```
  {
  "success": false,
  "message": "用户未登录",
  "data": null,
  "code": "FAIL_USER_NO_LOGIN"
  }
```

* 根据success字段判断是否成功
* 根据message字段标识失败原因



### 获取用户信息  **getUserInfo**
method: -> post
所需数据
> * id (检验登录)  
> * name （获取信息）  
> * token(登录时服务端返回数据)

示例http://115.159.26.94:3001/api/user/getUserInfo
```
{
"id": "3",
"name": "zstiu",
"token": "c38fff51-90ad-46c6-9fde-182020c4f2e5"
}
```

成功时返回
```
  {
  "success": true,
  "message": "",
  "data":
  {
    "id": 3,
    "email": "zstiu@foxmail.com",
    "name": "zstiu",
    "avatarUrl": null,
    "sex": null,
    "birthday": null,
    "major": null,
    "marked": null,
    "introduction": null,
    "create_time": "1492958357022",
    "modified_time": null,
    "score": 0,
    "level": 0,
    "phone": "15195891362"
  },
  "code": ""
  }
```
失败时返回
```
  {
  "success": false,
  "message": "用户未登录",
  "data": null,
  "code": 0
  }
```

* 根据success字段判断是否成功
* 根据message字段标识失败原因

### 更新用户信息  **update**
method: -> post
所需数据
> * id (检验登录)  
> name （修改信息,缺省时数据不发生变化，下同）  
> email(可缺省)  
> major（可缺省）  
> marked（可缺省）  
> birthday（可缺省）  
> sex（可缺省）  
> introduction（可缺省）  
> * token(登录时服务端返回数据)

示例http://115.159.26.94:3001/api/user/update
```

{
  "id": "4",
  "name": "测试3",
  "email": "",
  "major": "",
  "marked":"",
  "token": "5157002e-493d-4e35-9e24-f3ada49a99a8"
}

```

成功时返回
```
  {
  "success": true,
  "message": "",
  "data":
  {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "(Rows matched: 1 Changed: 1 Warnings: 0",
    "protocol41": true,
    "changedRows": 1
  },
  "code": ""
  }
```
失败时返回
```
  {
  "success": false,
  "message": "用户未登录",
  "data": null,
  "code": 0
  }
```

* 根据success字段判断是否成功
* 根据message字段标识失败原因


### 检验手机号是否被注册  **exitPhone**
method: -> post
所需数据
> * phone  


示例http://115.159.26.94:3001/api/user/exitPhone
```

  {
    "phone": "15195891361"
  }


```

成功时返回
```
  {
  "success": true,
  "message": "",
  "data": null,
  "code": "1111"
  }
```
失败时返回
```
  {
  "success": false,
  "message": "手机号已被注册",
  "data": null,
  "code": "0001"
  }
```

* 根据success字段判断是否成功
* 根据message字段标识失败原因


### 得到用户消息  **getUserMessage**
method: -> post
所需数据
> * id  
> * token


示例http://115.159.26.94:3001/api/user/getUserMessage
```

  {
  "id": "3",
  "token": "c38fff51-90ad-46c6-9fde-182020c4f2e5"
  }


```

成功时返回
```
  {
    "success": true,
    "message": "",
    "data":
      {
        "messageList":
        [
          {
            "id": 1,
            "userId": 3,
            "managerId": null,
            "type": "系统",
            "created_time": "1111111111",
            "title": "test",
            "message": "这是一个测试message的数据",
            "isWatched": 0
          }
        ]
      },
    "code": ""
  }
```
失败时返回
```
  {
  "success": false,
  "message": "手机号已被注册",
  "data": null,
  "code": "0001"
  }
```

* 根据success字段判断是否成功
* 根据message字段标识失败原因


### 用户打标签  **addPictureLabel**
method: -> post
所需数据
> * id  
> * pictureId
> * label


示例http://115.159.26.94:3001/api/user/addPictureLabel
```

{
  "id": "3",
  "pictureId": "47",
  "label": "大狗"
}


```

成功时返回
```
  {
    "success": true,
    "message": "",
    "data": null,
    "code": ""
  }
```
失败时返回
```
  {
  "success": false,
  "message": "请勿重复提交",
  "data": null,
  "code": ""
  }
```

* 根据success字段判断是否成功
* 根据message字段标识失败原因


### 更新用户头像 **updateUserAvatar**
method: -> post
所需数据(标星号为必须字段，下同)
> * id  
> * token  

示例http://115.159.26.94:3001/api/user/updateUserAvatar
```
{
	"id": "12",
  "token": "5be52e3f-a5fa-44c9-8e82-21cdfe217b84",
  "avatarUrl": "test"
}


```

成功时返回
```
  {
    "success": true,
    "message": "",
    "data": null,
    "code": 1111
  }
```
失败时返回
```
  {
  "success": false,
  "message": "用户未登录",
  "data": null,
  "code": 0
  }
```
* 根据success字段判断是否成功
* 根据message字段标识失败原因



## 管理员模块

> 目录： /manager

### 注册 **signUp**
method: -> post
所需数据(标星号为必须字段，下同)
> * name  
> * password  
> * confirmPassword  
>   email  
>   phone

示例http://115.159.26.94:3001/api/manager/signUp
```
  {
    "password": "123456",
    "confirmPassword": "123456",
    "email": "zst@foxmail.com",
    "name": "测试3",
    "phone": "15095891362"
  }

```

成功时返回
```
  {
  "success": true,
  "message": "",
  "data": null,
  "code": "1111"
  }
```
失败时返回
```
  {
  "success": false,
  "message": "两次密码不一致",
  "data": null,
  "code": ""
  }
```
* 根据success字段判断是否成功
* 根据message字段标识失败原因


### 登录 **signIn**
method: -> post
所需数据(标星号为必须字段，下同)
> * name  
> * password  

示例http://115.159.26.94:3001/api/manager/signIn
```
  {
    "password": "123456",
    "name": "测试3"
  }

```

成功时返回
```
  {
  "success": true,
  "message": "",
  "data":
  {
    "id": 9,
    "email": "zst@foxmail.com",
    "name": "测试3",
    "created_time": "1494078342224",
    "modified_time": null,
    "phone": "15095891362",
    "managerId": 9,
    "token": "63d225df-0a34-44eb-a9e5-470797af65ac"
  },
  "code": ""
  }
```
失败时返回
```
  {
  "success": false,
  "message": "用户名或登录密码错误",
  "data": null,
  "code": "FAIL_USER_NAME_OR_PASSWORD_ERROR"
  }
```
* 根据success字段判断是否成功
* 根据message字段标识失败原因


## 图片模块

> 目录： /picture

### 得到推送picture **getPicture**
method: -> post
所需数据(标星号为必须字段，下同)
> * id (用户id)    
> * limit (限制返回数据条数，默认为20条)  


示例http://115.159.26.94:3001/api/picture/getPicture
```
  {
    "id": "12",
    "limit": 20
  }


```

成功时返回
```
{
  "success": true,
  "message": "",
  "data":
  {
    "pictureList":
    [
      {
      "id": 67,
      "managerId": 9,
      "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\2b3b30de4e6e5.jpg",
      "type": null,
      "planId": 1,
      "acceptedLabel": null,
      "labelNumber": 0,
      "isFinished": "0",
      "resultLabel": null,
      "uploadTime": "1494412908810",
      "recognitionLabel": null
      },
      {"id": 68, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\86aa824b506d1.jpg",…},
      {"id": 69, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\f6af14cb6154c.jpg",…},
      {"id": 70, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\2c9f03856da43.jpg",…},
      {"id": 71, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\6704b25b8fc75.jpg",…},
      {"id": 72, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\22a5ebc2a6c64.jpg",…},
      {"id": 73, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\ac37649f2af95.jpg",…},
      {"id": 74, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\280a4747cc936.jpg",…},
      {"id": 75, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\5a7b6ec09f11d.jpg",…},
      {"id": 76, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\eade771658919.jpg",…},
      {"id": 77, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\0b942907d5bf8.jpg",…},
      {"id": 78, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\8f4f096350abe.jpg",…},
      {"id": 79, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\7627964e152ba.jpg",…},
      {"id": 80, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\db7b57eb5495e.jpg",…},
      {"id": 81, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\bd07bc5711345.jpg",…},
      {"id": 82, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\8f3eaea413c92.jpg",…},
      {"id": 83, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\4b53a511953ff.jpg",…},
      {"id": 84, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\29350d68e74f8.jpg",…},
      {"id": 85, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\3d34fac056ce8.jpg",…},
      {"id": 86, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\7e25db27d7249.jpg",…},
      {"id": 87, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\10\\ab5fd1247a099.jpg",…},
      {"id": 88, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\12\\32fb76c95644b.png",…},
      {"id": 89, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\16\\0938e6490dbc5.jpg",…},
      {"id": 90, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\20\\8d4f346e7e9c5.jpg",…},
      {"id": 91, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\20\\a9ab5184d7778.jpg",…},
      {"id": 92, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\20\\ba40d50d600fa.jpg",…},
      {"id": 93, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\21\\07f6eca76aa71.jpg",…},
      {"id": 94, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\21\\b4595c1fd2e09.jpg",…},
      {"id": 95, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\21\\5d0888a6ef163.jpg",…},
      {"id": 96, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\21\\67a057855e214.jpg",…},
      {"id": 97, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\21\\66f3f09878c39.jpg",…},
      {"id": 98, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\21\\a6097b260682d.jpg",…},
      {"id": 99, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\21\\a34925063c912.jpg",…},
      {"id": 100, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\21\\60581f8aa7cca.jpg",…},
      {"id": 101, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\21\\d393cf009d27a.jpg",…},
      {"id": 102, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\21\\66b1d3455181b.jpg",…},
      {"id": 103, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\21\\216d897d0bbdc.jpg",…},
      {"id": 104, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\21\\4479298e1230b.jpg",…},
      {"id": 105, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\21\\41406df01ef9a.jpg",…},
      {"id": 106, "managerId": 9, "path": "http://115.159.26.94:9001/common\\2017\\05\\21\\799846ce86d3a.jpg",…}
    ]
  },
  "code": ""
}
```
失败时返回
```
  {
    "success": false,
    "message": "输入字段缺省或错误",
    "data":[],
    "code": ""
  }
```
* 根据success字段判断是否成功
* 根据message字段标识失败原因

### 搜索图片 **searchPicture**
method: -> post
所需数据(标星号为必须字段，下同)
> * id (用户id)    
> * limit (限制返回数据条数，默认为20条)  
> * page (当前的页数)  


示例http://115.159.26.94:3001/api/picture/searchPicture
```
{
  "search": "小",
  "limit": 20,
  "page": 1
}

```

成功时返回
```
{
  "success": true,
  "message": "当前关键字无更多结果",
  "data":
    {
    "pictureList":
      [
        {
        "id": 115,
        "managerId": 9,
        "path": "http://115.159.26.94:9001/common/2017/05/21/78c55938848c3.jpg",
        "type": null,
        "planId": 0,
        "acceptedLabel": "小可爱",
        "labelNumber": 0,
        "isFinished": "0",
        "resultLabel": null,
        "uploadTime": "1495340284547",
        "recognitionLabel": "[]"
        },
        {"id": 116, "managerId": 9, "path": "http://115.159.26.94:9001/common/2017/05/21/0d70bcdcb95fa.jpg",…}
      ]
    },
  "code": "0010"
}
```
失败时返回
```
  {
    "success": false,
    "message": "输入字段缺省或错误",
    "data":[],
    "code": ""
  }
```
* 根据success字段判断是否成功
* 根据message字段标识失败原因