const {isAuthenticated} = require('../helpers/validate-auth')
const { redirectIfAuthenticated } = require('../helpers/validate-auth')


const {Router} = require('express')
const { renderRegisterForm, registerNewUser, renderLoginForm, loginUser, logoutUser,confirmEmail } = require('../controllers/user.controller')
const router = Router()

//registro
router.get('/user/register',renderRegisterForm)
router.post('/user/register',registerNewUser)

//login
router.get('/user/login', redirectIfAuthenticated, renderLoginForm)

router.post('/user/login',loginUser)


router.post('/user/logout',logoutUser)


router.get('/user/confirmar/:token',confirmEmail)

module.exports =router