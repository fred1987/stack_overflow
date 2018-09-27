const bodyParser = require('./bodyParser')
const errors = require('./errors')
const helmet = require('./helmet')
const cors = require('./cors')
const passport = require('./passport')
const serve = require('./static')

module.exports = [
    helmet,
    cors,
    bodyParser,
    passport,
    errors,
    serve
]