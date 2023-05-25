const express=require('express')
const router= express.Router()
const{register,login,sociallogin,user}=require('../controllers/user.controller')

router.post('/register',register)

router.post('/login',login)
router.post('/socialogin',sociallogin)
router.get('/users',user)


module.exports=router
