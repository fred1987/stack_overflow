const Router = require('koa-router')
const userController = require('./controllers/user')

const router = new Router()

router
    .post('/api/login', userController.login)
    .post('/api/register', userController.register)
    .post('/api/recovery/email', userController.sendEmailRecovery)
    .post('/api/recovery/pswd', userController.changePassword)

module.exports = router