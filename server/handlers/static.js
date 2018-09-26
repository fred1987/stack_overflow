const serve = require('koa-static')
const mount = require('koa-mount')

module.exports = (app) => {
    app.use(serve('public'))
    app.use(mount('/public', app))
}