const express = require('express');
const router = express.Router(); // 路由对象
const models = require('../../db/models')
const { SUCCESS_CODE, ERROR_CODE } = require('../const')

/** 登录 */
router.post('/save', async (req, res, next) => {
    try {
        // 创建者 id代号 页面配置信息 活动页面的设置信息
        const { creator, tid, tpl, pageConfig } = req.body;
        console.log('123', typeof tpl)
        if (creator && tid && tpl && pageConfig) {
            const user = await models.Users.findOne({
                where: { name: creator }
            })
            if (user) {
                const page = await models.Pages.create({
                    creator,
                    tid,
                    tpl: JSON.stringify(tpl),
                    pageConfig: JSON.stringify(pageConfig)
                })
                if (page) {
                    res.json({
                        code: SUCCESS_CODE,
                        data: {
                            ...page, pageConfig: JSON.parse(page.pageConfig), tpl: JSON.parse(page.tpl)
                        },
                        message: 'success'
                    })
                } else {
                    res.json({
                        code: ERROR_CODE,
                        message: '保存信息失败'
                    })
                }

            } else {
                res.json({
                    code: ERROR_CODE,
                    message: '创建的用户不存在'
                })
            }
        } else {
            next(new Error('保存失败'))
        }
    } catch (error) {
        next(error)
    }
})
router.get('/get', async (req, res, next) => {
    try {
        const { tid } = req.query;
        if (tid) {
            const page = await models.Pages.findOne({
                where: { tid }
            })

            res.json({
                code: SUCCESS_CODE,
                message: 'success',
                data: {
                    ...page, pageConfig: JSON.parse(page.pageConfig), tpl: JSON.parse(page.tpl)
                }
            })
        } else {
            next(new Error('缺少参数'))
        }
    } catch (error) {
        next(error)
    }
})
// router.get('/list', async (req, res, next) => {
//     try {
//         const { page = 1, limit = 10 } = req.query;
//         const offset = (page - 1) * limit;
//         const list = await models.Users.findAndCountAll({
//             where: {},
//             offset,
//             limit
//         })
//         res.json({
//             code: SUCCESS_CODE,
//             data: list
//         })
//     } catch (error) {
//         next(error)
//     }
// })

module.exports = router;