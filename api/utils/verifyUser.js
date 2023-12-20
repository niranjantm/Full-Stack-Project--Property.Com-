import errorHandler from "./error.js";
import jwt from "jsonwebtoken";

export default function verifyUser(req,res,next){
    
    const token = req.cookies.access_token;
    console.log("token = ",token);
    if(!token){
        return next(errorHandler(401,"Unauthorized"));
    }
    try{
        jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
            if(error){
                return next(errorHandler(403,"Forrbiden"))
            }
            req.user = user;
            next();
        })
    }catch(error){
        next(error)
    }
}