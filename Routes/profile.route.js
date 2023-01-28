let express=require("express")
const { Usermodel } = require("../Models/User.model")
let app=express()
app.use(express.json())

let ProfileRoute=express.Router()

ProfileRoute.get("/getProfile",async(req,res)=>{

    let userId=req.body.userId
    console.log(userId)
  
    let UserProfile=await Usermodel.findOne({_id:userId})
 
    try {
        res.send({"msg":UserProfile})
    } catch (error) {
        res.send({"msg":error})
        
    }
})
module.exports={ProfileRoute}