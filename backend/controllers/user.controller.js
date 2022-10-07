const express = require('express')
const usermodel = require('../models/user.model')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
require('dotenv').config()
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

router.post('/login',async (req,res)=>{

    try {
        const {email,password}=req.body
        // console.log(email,password);
        const finduser = await usermodel.findOne({email:email})
        if(!finduser){
          return  res.status(404).send({message: 'please check email and password'})
        }
         console.log(finduser)
         const passwordcompare= await bcrypt.compare(password, finduser.password)

         if(passwordcompare!==true){

            return res.status(500).send({message:'please check email and password'})
         }

         const payload ={
             id:finduser._id,
             email:finduser.email,
             username:finduser.username,
             exp: Date.now()  + (60 * 60*1000)
         }
        
         console.log(payload.exp,'-',);
         console.log(Date.now())
         
         // create env key
       const sigintoken=  JWT.sign(payload,process.env.HASHKEY)
          res.status(200).send({sigintoken})

        
    } catch (error) {
        res.send(error.message)
        
    }

    
})

router.post('/socialogin',async (req,res)=>{

    try {
        const {firebasetoken}=req.body
        // console.log(email,password);
      const firebaseuser=await JWT.decode(firebasetoken)
// console.log('')
      const {user_id ,email,name,picture,iss}=firebaseuser
      console.log('received firebase user:\n',user_id ,email,name,picture,iss);

      const finduserbyemail = await usermodel.findOne({email:email})
    //   const finduseruser_id = await usermodel.findOne({firebaseuniqueid:user_id})

      console.log('useremail in db: \n',finduserbyemail);
    //   console.log('userid in db: \n',finduseruser_id);

      if(finduserbyemail===null ){
       const newuser= await usermodel.create({email:email,firebaseuniqueid:user_id,profileimg:picture,username:name})
      return res.send({message:`welcome ${name}`,user:newuser})
      }

      return res.send({message:`welcome back ${name}`,user:finduserbyemail})

        
    } catch (error) {
        res.send(error.message)
        
    }

    
})

router.get('/users',async(req,res)=>{

    const users = await usermodel.find()
    res.send({message:'register route working',users})
})

module.exports =router



