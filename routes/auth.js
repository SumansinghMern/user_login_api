const express = require('express');

const { signUp, login }  =require('../controller/auth')

const User = require('../models/user')

const routes = express.Router();

routes.post('/signup', signUp)

routes.post('/login', login)

module.exports = routes;