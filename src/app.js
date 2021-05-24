const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const models = require('../db/models')
const UserRoute = require('./routes/user_route')
const PreviewPageRoute = require('./routes/preview_route')
const H5PageRoute = require('./routes/h5_route')
const SUCCESS_CODE = 0;
const ERROR_CODE = 1

app.use(express.json())
app.use(express.urlencoded())
app.use(bodyParser.urlencoded({ extends: true }))
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Authorization,Accept,x-requested-with,Content-Encoding");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use('/user', UserRoute)
app.use('/preview', PreviewPageRoute)
app.use('/h5', H5PageRoute)
app.use((err, req, res, next) => {
    if (err) {
        res.status(200).json({
            code: ERROR_CODE,
            message: err.message
        })
    }
})

app.listen(4000, () => {
    console.log('项目在4000端口成功启动了')
})