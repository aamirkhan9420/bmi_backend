let express=require("express")
let connection=require("./Config/db")
let app=express()
app.use(express.json())
let cors=require("cors")
const { UserRoute } = require("./Routes/user.route")
const { authentication } = require("./middleware/authen")
const { ProfileRoute } = require("./Routes/profile.route")
const { UsrBmiRoute } = require("./Routes/bmi.route")
require("dotenv").config()
let PORT=process.env.PORT||8000
app.use(cors({
  origin:"*"
}))

app.get("/",(req,res)=>{

    res.send("welcome to BMI app")
})
app.use("/user",UserRoute)
app.use(authentication)
app.use("/userProfile",ProfileRoute)
app.use("/userBmi",UsrBmiRoute)
app.listen(PORT,async(req,res)=>{
    try {
        await connection
        console.log(`listening on ${PORT}`)
    } catch (error) {
        console.log("error while making connection ")
    }
})