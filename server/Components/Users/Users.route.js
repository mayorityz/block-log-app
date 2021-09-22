const express = require('express')
const Router = express.Router()

let controller = require('./Users.controller.js')
Router.post('/createAccount', controller.register)
Router.post('/login', controller.login)
Router.post('/createBankAccount', controller.createAccount)
Router.post('/fetchBankDetails', controller.bankDetails)

module.exports = Router
