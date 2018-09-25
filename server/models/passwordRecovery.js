const mongoose = require('mongoose')
const {Schema} = mongoose

const PasswordRecoverySchema = new Schema({
    hash: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports = mongoose.model('passwordRecovery', PasswordRecoverySchema)