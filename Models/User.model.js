let mongoose=require("mongoose")


let userschema=mongoose.Schema({
    name:String,
    email:String,
    password:String,


})
let Usermodel=mongoose.model('user',userschema)

module.exports={Usermodel}