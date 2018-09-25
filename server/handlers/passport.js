const passport = require('koa-passport')
const init = require('../middleware/passport')

module.exports = (app) => {
    app.use(passport.initialize())
    init(passport)
}