let express=require("express")

let jwt=require("jsonwebtoken")

const { Usermodel } = require("../Models/User.model")

let bcrypt=require("bcrypt")

let app=express()

require("dotenv").config()

app.use(express.json())

let UserRoute=express.Router()

//-----Signup-----//

UserRoute.post("/signup",(req,res)=>{

    let {name,email,password}=req.body
   
try {
   bcrypt.hash(password,5,async(err,hashedpassword)=>{

       if(hashedpassword){

           let newUser=new Usermodel({name:name,email:email,password:hashedpassword})
           await newUser.save()

           res.send({"msg":"new user registered seccessfully"})
       }else{
           res.send({msg:err})

       }
   })
   
} catch (error) {

   res.send({"msg":error})
   }
  })

      //------Login------//

  UserRoute.post("/login",async(req,res)=>{

    let {email,password}=req.body

    let user=await Usermodel.find({email})

try {
   if(user.length>0){

    let hashpassword=user[0].password

      bcrypt.compare(password,hashpassword,(err,result)=>{

        if(result){
            jwt.sign({userId:user[0]._id},process.env.KEY,(er,token)=>{
                if(token){

                    res.send({"msg":"login successful","token":token})
                }else{

                    res.send({"msg":"login failed","err":er})
                }
            })
        }else{

            res.send({"msg":"login failed","err":err})
        }
      })
   }
   
} catch (error) {
   res.send({"msg":error})
   
}
  

})
UserRoute.post("/logout",(req,res)=>{
    
})
module.exports={UserRoute}