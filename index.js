const express = require('express');
const mongoose = require('mongoose');
const UserModel= require("./user")
require('dotenv').config();
const app = express();
app.use(express.json());

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;


//signup user
app.post("/user/signup",async (req,res)=>{

const user = new UserModel(req.body)
await user.save();
res.json({response:"user Created"})

})

app.get("/user/:id", async (req, res)=>{
    const userId = req.params.id;
    const user= await UserModel.findById(userId);
    if(!user) return res.json({response:"user not found"});
    return res.json({response:"User Found", user});
})

app.delete("/user/:id", async (req, res)=>{
    const userId = req.params.id;
    const user= await UserModel.findById(userId);
    if(!user) return res.json({response:"user not found"});
   // const user= await UserModel.deleteOne({_id:userId});
    // console.log(user);
    //if(user.deletedCount===0) return res.json({response:"user not Deleted"});
   await user.remove();
    return res.json({response:"User Deleted"});
})



database.once('connected', () => {
    console.log('Database Connected');
    app.listen(3000, () => {
        console.log(`Server Started at 3000`)
    })
})
database.on('error', (error) => {
    console.log(error)
})


