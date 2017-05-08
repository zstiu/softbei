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
    "phone"
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
    "data":{
    "id": 3,
    "email": "zstiu@foxmail.com",
    "name": "zstiu",
    "major": null,
    "marked": null,
    "create_time": "1492958357022",
    "modified_time": null,
    "score": 0,
    "level": 0
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
