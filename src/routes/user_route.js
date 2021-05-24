const express = require('express');
const router = express.Router(); // 路由对象
const models = require('../../db/models')
const { SUCCESS_CODE } = require('../const')

const { Users } = models

/** 登录 */
router.post('/login', async (req, res, next) => {
    try {
        const { name, password } = req.body;
        if (name && password) {
            const user = await Users.findOne({
                where: { name, password }
            })
            if (user) {
                res.json({
                    code: SUCCESS_CODE,
                    data: user,
                    message: 'success'
                })
            } else {
                res.json({
                    code: 1,
                    message: '用户名或者密码不正确'
                })
            }
        } else {
            next(new Error('缺少必要参数'))
        }
    } catch (error) {
        next(error)
    }
})

router.get('/list', async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const list = await Users.findAndCountAll({
            where: {},
            offset,
            limit
        })
        res.json({
            code: SUCCESS_CODE,
            data: list
        })
    } catch (error) {
        next(error)
    }
})

router.post('/add', async (req, res, next) => {
    try {
        const { name, password, end_time = '2021-12-31T14:04:48.000Z' } = req.body;
        if (name && password && end_time) {
            const user = await Users.create({
                name, password, end_time
            })
            console.log('123', user, user instanceof Users, typeof user.createAtpage);
            res.json({
                code: SUCCESS_CODE,
                message: 'success',
                data: user
            })
        } else {
            next(new Error('缺少必要参数'))
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router;