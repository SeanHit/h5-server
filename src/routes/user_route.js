const express = require('express')
const { Op } = require("sequelize");
const md5 = require('md5')
const router = express.Router(); // 路由对象
const { User, Page } = require('../../db/models')
const { SUCCESS_CODE, ERROR_CODE } = require('../const')


/** 登录 */
router.post('/login', async (req, res, next) => {
    try {
        const { name, password } = req.body;
        if (name && password) {
            const user = await User.findOne({
                where: { name, password: { [Op.or]: [md5(password), password] } },
                attributes: { exclude: ['password'] }
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

/** 获取用户列表 */
router.get('/list', async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const list = await User.findAndCountAll({
            attributes: { exclude: ['password'] },
            where: {},
            offset,
            limit,
            include: Page
        })
        res.json({
            code: SUCCESS_CODE,
            data: list
        })
    } catch (error) {
        next(error)
    }
})

/** 添加用户 注册 */
router.post('/add', async (req, res, next) => {
    try {
        const { name, password, end_time = '2021-12-31 23:59:59.999' } = req.body;
        if (name && password && end_time) {

            const user = await User.create({
                name, password, end_time
            })
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

/** 删除用户 */
router.delete('/del', async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) next(new Error('缺少必要参数'));
        const num = await User.destroy({
            where: {
                name
            },
            limit: 1
        });
        if (num > 0) {
            res.json({
                code: SUCCESS_CODE,
                message: '删除成功'
            })
        } else {
            res.json({
                code: ERROR_CODE,
                message: '删除的用户不存在'
            })
        }
    } catch (error) {
        next(error);
    }
})

/** 修改用户信息 */
router.post('/update', async (req, res, next) => {
    try {
        const { name, password, end_time } = req.body;
        if (!name) next(new Error('缺少必要参数'));
        let user = await User.findOne({
            where: { name }
        })
        if (user) {
            user = await user.update({
                password, end_time
            })
            res.json({
                code: SUCCESS_CODE,
                data: user,
                message: 'success'
            })
        } else {
            res.json({
                code: ERROR_CODE,
                message: '更新的用户不存在'
            })
        }

    } catch (error) {
        next(error)
    }
})



module.exports = router;