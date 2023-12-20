import express from "express";
import User from "../models/user.model.js";
//import bodyParser from "body-parser";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

const router = express.Router();



//----------------------------------------------------SIGN-UP---------------------------------------------------
router.post("/sign-up", async (req, res, next) => {
  const { user, email, password } = req.body;
  console.log(req.body);
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username: user,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json("User Created");
  } catch (error) {
    next(error);
  }
});
// --------------------------------------------------------SIGN IN-------------------------------------------
router.post("/sign-in", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return next(errorHandler(404, "Invalid User"));
    }
    console.log(validUser);
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }

    const { password: pass, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token",token)
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
});

// ----------------------------------------------Google Auth------------------------------------------------------ 
router.post("/google", async (req, res, next) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });
    if (!user) {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          data.username.split(" ").join("").toLowerCase()+
          Math.random().toString(36).slice(-4),
        email: data.email,
        password: hashedPassword,
        photo:data.photo
      });
      await newUser.save();
      const {password:pass,...rest} = newUser._doc;
      const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
      res.cookie("access_token",token,{httpOnly:true}).status(200).json(rest);
    }
    else{
        const {password:pass,...rest} = user._doc;
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.cookie("access_token",token,{httpOnly:true}).status(200).json(rest)
    }
  } catch (error) {
    next(error);
  }
});
// ----------------------------------------------Sign-Out----------------------------------------------------------

router.get("/sign-out",(req,res,next)=>{
  try{

   
    res.status(200).clearCookie("access_token").json("User signed-out successfully");
    
    
  }catch(error){
    next(error);
  }
});

export default router;