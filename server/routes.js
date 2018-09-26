const Router = require('koa-router')
const userController = require('./controllers/user')

const {createReadStream} = require('fs')

const router = new Router()

router
    .get('/*', (ctx) => {
        ctx.type = 'html'
        ctx.body = createReadStream('public/index.html')
    })
    .post('/api/login', userController.login)
    .post('/api/register', userController.register)
    .post('/api/recovery/email', userController.sendEmailRecovery)
    .post('/api/recovery/pswd', userController.changePassword)

module.exports = router