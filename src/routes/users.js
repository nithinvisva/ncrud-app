const express = require('express')
var router = express()
const login = require('../controller/users');
const register = require('../controller/users');
const auth = require('../controller/users');
const bodyparser = require('body-parser');

router.use(bodyparser.json()) 
router.post('/register',register.register) 
router.get('/auth',auth.auth)
router.post('/login',login.login)

module.exports= router