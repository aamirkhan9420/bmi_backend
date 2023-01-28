let mongoose=require("mongoose")


let bmischema=mongoose.Schema({
    height:String,
    weight:String,
    userId:String,
    BMI:String
},{timestamps:true})

let Bmimodel=mongoose.model('bmi',bmischema)

module.exports={Bmimodel}