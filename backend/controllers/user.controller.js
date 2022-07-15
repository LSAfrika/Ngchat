const express = require('express')
const usermodel = require('../models/user.model')
const bcrypt = require('bcrypt')

const router = express.Router()

router.post('/register',async(req,res)=>{

    try {
        const {email,phone,username,password,repassword}=req.body

      

        const finduser = await usermodel.findOne({email:email})
        if(finduser){
          return  res.status(409).send({message: 'email already exists'})
        }
        if(password!==repassword){
            return res.status(500).send('password are not similar')
        }

       const hash=await bcrypt.hash(password,10)

        console.log('hash password: ',hash);
       const newuser = new usermodel({
       
        email,
        phone,username,
        password:hash

    })

    const newuserresult = await newuser.save()

  const userresponse={
        id:newuserresult._id,
       email: newuserresult.email,
       phone:newuserresult.phone,
       username:newuserresult.username
    }

    res.status(200).send({message:'user created successfully',...userresponse})

  

       // next()
    } catch (error) {

        return res.status(500).send({errormessage:error.message,servermessage:'an error occured'})
        
        
    }
    
})

router.get('/users',async(req,res)=>{

    const users = await usermodel.find()
    res.send({message:'register route working',users})
})

module.exports =router



