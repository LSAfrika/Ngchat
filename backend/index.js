const express=require('express')
const app=express()
const cors=require('cors')
const mongoose = require('mongoose')

const LocalDBconnection =`mongodb://localhost:27017/ngchat`


app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.get('/',async(req,res)=>{

    res.send({message:'root route working'})
})

app.use('/user',require('./controllers/user.controller'))




mongoose.connect(LocalDBconnection,{useNewUrlParser:true,useunifiedtopology:true}).
then(()=>{
    console.log('connected succesfully')
 
    const server=app.listen(3000,()=>{
        console.log('app listening on port ',server.address().port);
    })
}).catch(err=>console.log(err))
