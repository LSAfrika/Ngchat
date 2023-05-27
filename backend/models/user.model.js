const mongoose= require('mongoose')


const userschema = new mongoose.Schema({

    email:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String },
    firebaseuniqueid:{type:String,required:true},
    profileimg:{type:String },
    // handle:{type:String,required:true},
    online:{type:Boolean,required:true,default:false},
    lastseen:{type:Number,required:true,default:Date.now()}

},{timestamps:true}

)

exports.usermodel = mongoose.model('user',userschema)
