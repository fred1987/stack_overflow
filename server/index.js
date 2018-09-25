const Koa = require('koa')
const mongoose = require('mongoose')
const handlers = require('./handlers')
const router = require('./routes')
const {dbUrl, port} = require('./config')

mongoose.set('useCreateIndex', true)

mongoose.connect(dbUrl, {useNewUrlParser: true}).catch(err => {
    console.error(err)
})

const app = new Koa()

handlers.forEach(handler => handler(app))

app.use(router.routes()).use(router.allowedMethods({
    throw: true
}))

app.listen(port, err => {
    if (err) console.error(err)
})