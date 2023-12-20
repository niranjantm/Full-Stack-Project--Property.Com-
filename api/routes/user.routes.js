import express from "express"
import verifyUser from "../utils/verifyUser.js";
import errorHandler from "../utils/error.js";
import bcrypt from "bcryptjs"
import User from "../models/user.model.js";

const router = express.Router();

// ------------------------------------------------------Update User-------------------------------------
router.post("/update/:id",verifyUser, async (req,res,next)=>{
    //
    
    if(req.user.id!=req.params.id){
        return next(errorHandler(401,"You are only allowed to update your own account"));
    }
    try{
       if(req.body.password!=="" && req.body.password!==null && req.body.password!==undefined){
        req.body.password = bcrypt.hashSync(req.body.password,10);
       }

       const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            email:req.body.eamil,
            password:req.body.password,
            photo:req.body.photo
        }
       },{new:true});
      const {password,...rest} = updatedUser._doc;
      res.status(200).json(rest)
    }catch(error){
        next(error)
    }
})
// -------------------------------DELETE-USER--------------------------------------------------------
router.delete("/delete/:id",verifyUser,async (req,res,next)=>{
    if(req.user.id!=req.params.id){
        return next(errorHandler(401,"Unathorized user"))
    };
    try{
        
        await User.findByIdAndDelete(req.params.id,)
        res.status(200).clearCookie("access_token").json("user deleted successfully");
    }catch(error){
        next(error)
    }
})
//------------------------------------CONTACT-------------------------------------------------------
router.get("/:id",verifyUser,async(req,res,next)=>{
    if(!req.user.id){
        return next(errorHandler(400,"Sign-in to view contact details"))
    }
    try{
        console.log("Contact-----> ",req.params.id)
        const user = await User.findById(req.params.id);
        console.log(user);
        const{password,...rest} = user._doc;
        res.status(200).json(rest);
    }catch(error){
        next(error);
    }
})

export default router;