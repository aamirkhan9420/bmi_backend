let express=require("express")
let {Bmimodel}=require("../Models/Bmi.model")
let app=express()
app.use(express.json())

let UsrBmiRoute=express.Router()
UsrBmiRoute.post("/calculateBMI",async(req,res)=>{
    let {height,weight,userId}=req.body
    let h=Number(height)/3.28084
    let  BMI= Number(weight)/h
  let newBmi=new Bmimodel({userId,BMI,height:h,weight})
  await newBmi.save()
  res.send({"msg":BMI})
})
UsrBmiRoute.get("/getCalculation", async (req, res) => {
    const {userId} = req.body

    const HistoryBmi = await Bmimodel.find({userId:userId})

    res.send({HistoryBmi : HistoryBmi})
})
module.exports={UsrBmiRoute}