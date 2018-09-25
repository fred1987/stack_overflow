const User = require('../models/user')
const pswdRec = require('../models/passwordRecovery')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const {token, email} = require('../config')

class UserController {
    static async findByEmail(ctx) {
        const user = await User.findOne({email: ctx.request.body.email})
        return (user) ? user : null
    }

    static async findById(id) {
        const user = await User.findOne({_id: id}).select('email id')
        return (user) ? user : null
    }

    static async sendEmailRecovery(ctx) {
        const user = await UserController.findByEmail(ctx)

        if (null === user) return {
            error: true,
            message: 'Такого пользователя нет в системе'
        }

        const salt = bcrypt.genSaltSync(11)
        const hash = bcrypt.hashSync(ctx.request.body.email, salt)

        const transporter = nodemailer.createTransport({
            host: email.host,
            port: email.port,
            secure: (email.port === '465'), // true for 465, false for other ports
            auth: {
                user: email.user,
                pass: email.password
            }
        })

        const mailOptions = {
            from: email.user,
            to: ctx.request.body.email,
            subject: 'Восстановление пароля',
            text: `Для восстановления пароля пройдите по ссылке http://localhost:6602/recovery/change_password?hash=${hash}`,
            html: `Для восстановления пароля пройдите по <a href="http://localhost:6602/recovery/change_password?hash=${hash}">ссылке</a>`
        }

        const mail = await transporter.sendMail(mailOptions)

        if (!mail.error) {
            await pswdRec({
                email: ctx.request.body.email,
                hash
            }).save()
            ctx.body = {error: false}
        }
    }

    static async changePassword(ctx) {
        const {email} = await pswdRec.findOne({hash: ctx.request.body.hash})
        const user = await User.findOne({email})
        return await user.save({
            password: bcrypt.hashSync(ctx.request.body.password, bcrypt.genSaltSync(11))
        }).select('email id')
    }

    static async getToken(ctx, candidate) {
        const pswdRes = bcrypt.compareSync(ctx.request.body.password, candidate.password)
        if (pswdRes) {
            const key = jwt.sign({
                id: candidate._id
            }, token, {expiresIn: 60 * 60})
            return {
                error: false,
                token: `Bearer ${key}`
            }
        } else {
            return {error: true}
        }
    }

    static async register(ctx) {
        const candidate = await UserController.findByEmail(ctx)
        if (!candidate) {
            const salt = bcrypt.genSaltSync(11)
            const user = await User({
                email: ctx.request.body.email,
                password: bcrypt.hashSync(ctx.request.body.password, salt)
            }).save()
            ctx.response.status = 201
            ctx.body = {
                error: false,
                user
            }
        } else {
            ctx.response.status = 409
            ctx.body = {
                error: true,
                message: 'Такой пользователь уже зарегистрирован в системе'
            }
        }
    }

    static async login(ctx) {
        const candidate = await UserController.findByEmail(ctx)
        if (!candidate) {
            ctx.response.status = 404
            ctx.body = {
                error: true,
                message: 'Пользователь не найден'
            }
        } else {
            const res = await UserController.getToken(ctx, candidate)
            if (res.error) {
                ctx.response.status = 403
                ctx.body = {
                    error: true,
                    message: 'Неправильный логин или пароль'
                }
            } else {
                ctx.body = {
                    error: false,
                    token: res.token
                }
            }
        }
    }
}

module.exports = UserController