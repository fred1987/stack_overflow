const {Strategy, ExtractJwt} = require('passport-jwt')
const User = require('../controllers/user')
const {token} = require('../config')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: token
}

//middleware for check secure routes
module.exports = function init(passport) {
    passport.use(new Strategy(options, async (payload, done) => {
        const user = await User.findById(payload.id)
        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }
    }))
}