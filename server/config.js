const dotenv = require('dotenv')
const path = require('path')

const root = path.join.bind(this, __dirname, '../')
dotenv.config({path: root('.env')})

//app data
const url = process.env.APP_URL
const port = process.env.APP_PORT
const token = process.env.TOKEN

//database
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbUrl = `mongodb://${dbUser}:${dbPassword}@ds046677.mlab.com:46677/crm`

//email
const email = {
    port: process.env.E_PORT,
    host: process.env.E_HOST,
    user: process.env.E_USER,
    password: process.env.E_PASSWORD
}

module.exports = {
    email,
    url,
    port,
    token,
    dbUser,
    dbPassword,
    dbUrl
}