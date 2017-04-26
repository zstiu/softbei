# 软件杯服务端API文档 

> ip地址: 生产/测试环境115.159.26.94   本地：localhost   
> 端口号：3001  
> 根目录： /api  

## 用户模块
> 目录： /user

### 注册 **signUp**
method: -> post
所需数据(标星号为必须字段，下同)
> * name  
> * password  
> * confirmPassword  
> email  

示例http://115.159.26.94:3001/api/user/signUp
```
    {
    "password": "123456",
    "confirmPassword": "123456",
    "name": "zstiu",
    "email": "zstiu@foxmail.com"
    }

```

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

### 更新用户信息  **update**
method: -> post
所需数据
> * id (检验登录)  
> name （修改信息,缺省时数据不发生变化，下同）  
> email(可缺省)  
> major（可缺省）  
> marked（可缺省）  
> * token(登录时服务端返回数据)

示例http://115.159.26.94:3001/api/user/signOut
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