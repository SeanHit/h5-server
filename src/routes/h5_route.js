const express = require('express');
const router = express.Router(); // 路由对象
const models = require('../../db/models')
const { SUCCESS_CODE, ERROR_CODE } = require('../const')

/** 查找某个用户下所有创建的h5页面 */
router.get('/list', async (req, res, next) => {
    try {
        const { page = 1, limit = 10, creator } = req.query;
        if (creator) {
            const offset = (page - 1) * limit;
            const list = await models.Pages.findAndCountAll({
                where: { creator },
                offset,
                limit
            })
            res.json({
                code: SUCCESS_CODE,
                data: list
            })
        } else {
            res.json({
                code: ERROR_CODE,
                message: '缺少必要参数'
            })
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router;