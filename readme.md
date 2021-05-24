# H5编辑器后端项目

## 1. 注册用户
### 请求方式
    POST /user/add
### 参数类型
| 参数 | 是否必选| 类型 | 说明 |
|---|---|---|---|
| name | 是 | string | 用户名|
| password | 是|string|密码|
| end_time | 否 | string | 用户的有效期 默认是2021/12/31 | 
### 返回实例
    成功:
        {
          "code": 0,
          "message": "success",
          "data": {
            "id": 7,
            "name": "wangwu",
            "password": "wangwu",
            "end_time": "2021-12-31T14:04:48.000Z",
            "updatedAt": "2021-05-24T02:27:37.441Z",
            "createdAt": "2021-05-24T02:27:37.441Z"
          }
        }
	失败
        {
            "code": 1,
            "message": "请求错误"
        }

## 2. 删除用户
### 请求方式
    DELETE /user/del 
### 参数类型
| 参数 | 是否必选 | 类型 | 说明 |
|---|---|---|---| 
| id | 是 | int | 用户id |
### 返回实例
    成功:
        {
          "code": 0,
          "message": "success"
        }
    失败
        {
            "code": 1,
            "message": "删除的用户不存在"
        }

## 3. 修改用户信息
### 请求方式
    POST /user/update
### 参数类型
|参数|是否必选|类型|说明|
|---|---|---|---|
| id | 是 | int | 用户唯一id |
| name | 否 | string | 用户名 |
| password | 否 | string | 密码 |
|end_time| 否 | string | 用户可使用的最后时间|
### 请求示例
    成功:
        {
          "code": 0,
          "message": "success",
           "data": {
            "id": 7,
            "name": "wangwu",
            "password": "wangwu",
            "end_time": "2021-12-31T14:04:48.000Z",
            "updatedAt": "2021-05-24T02:27:37.441Z",
            "createdAt": "2021-05-24T02:27:37.441Z"
          }
        }
    失败
        {
            "code": 1,
            "message": "修改错误"
        }

## 4. 查询用户列表
### 请求方式
    GET /user/list
### 参数类型
|参数|是否必选|类型|说明|
|---|---|---|---|
| page | 否 | int | 页码 默认为1 |
| limit | 否 | int | 分页大小 默认为10 |
### 返回实例
    成功
        {
          "code": 0,
          "data": {
            "count": 5, // 所有用户的总数
            "rows": [
              {
                "id": 1,
                "name": "liuxiang",
                "password": "liuxiang",
                "end_time": "2021-12-31T14:04:48.000Z",
                "start_time": "2021-05-06T14:05:01.000Z",
                "createdAt": "2021-05-06T14:05:04.000Z",
                "updatedAt": "2021-05-06T14:05:07.000Z"
              },
              {
                "id": 4,
                "name": "wangxiaoer",
                "password": "wangxiaoer",
                "end_time": "2021-12-31T14:04:48.000Z",
                "start_time": null,
                "createdAt": "2021-05-23T15:11:17.000Z",
                "updatedAt": "2021-05-23T15:11:17.000Z"
              }
            ]
          }
        }
    失败
        {
            "code": 1,
            "message": "请求错误"
        }

 
