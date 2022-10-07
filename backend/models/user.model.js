const mongoose= require('mongoose')


const userschema = new mongoose.Schema({
   
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        // required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
    
    },
    firebaseuniqueid:{
        type:String,
        required:true
    },
    profileimg:{
        type:String
    }

},{timestamps:true}

)

module.exports = mongoose.model('user',userschema)