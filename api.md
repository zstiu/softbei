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
  "message": "",
  "data":
  {
    "id": 3,
    "email": "zstiu@foxmail.com",
    "name": "zstiu",
    "major": null,
    "marked": null,
    "create_time": "1492958357022",
    "modified_time": null,
    "score": 0,
    "level": 0,
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


示例http://115.159.26.94:3001/api/user/update
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
    ],
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


## 管理员模块

> 目录： /manager

### 注册 **signUp**
method: -> post
所需数据(标星号为必须字段，下同)
> * name  
> * password  
> * confirmPassword  
> * email  
> * phone

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

### 注册 **getPicture**
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
[
  {
    "id": 47,
    "managerId": 9,
    "path": "115.159.26.94:9001\\common\\2017\\05\\10\\84fc0fe12cdf1.jpg",
    "type": null,
    "planId": 1,
    "acceptedlabel": null,
    "labelNumber": 0,
    "isFinished": 0,
    "uploadTime": "1494412905926"
  },
  {"id": 48, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\ea730cbf5b24e.jpg", "type": null,…},
  {"id": 49, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\d2428ee397187.jpg", "type": null,…},
  {"id": 50, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\b924a99edcb66.jpg", "type": null,…},
  {"id": 51, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\9b13af5898d6d.jpg", "type": null,…},
  {"id": 52, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\06d86e4dce856.jpg", "type": null,…},
  {"id": 53, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\0451cae6962ed.jpg", "type": null,…},
  {"id": 54, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\33ec55a956a09.jpg", "type": null,…},
  {"id": 55, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\4e56fdc09670d.jpg", "type": null,…},
  {"id": 56, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\d785998498834.jpg", "type": null,…},
  {"id": 57, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\8044922da2a44.jpg", "type": null,…},
  {"id": 58, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\dd58ad9ef68fe.jpg", "type": null,…},
  {"id": 59, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\2eec56b05078f.jpg", "type": null,…},
  {"id": 60, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\e77c7b9be044b.jpg", "type": null,…},
  {"id": 61, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\71dfcc78444c5.jpg", "type": null,…},
  {"id": 62, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\0996cb046120d.jpg", "type": null,…},
  {"id": 63, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\a0ae6dd55163d.jpg", "type": null,…},
  {"id": 64, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\62921def4045a.jpg", "type": null,…},
  {"id": 65, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\485f0b0f99a4b.jpeg", "type": null,…},
  {"id": 66, "managerId": 9, "path": "115.159.26.94:9001\\common\\2017\\05\\10\\0838be51c5383.jpg", "type": null,…}
],
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