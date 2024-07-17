import jwt from "jsonwebtoken";

import { User } from "../models/userModel.js";

const isAuthenticated = async(req,res,next) => {
  try {
    // const token = req.cookies.token;
    // let token = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // console.log("token........",token);
    // token=JSON.stringify(token);
    // console.log("token........",token);
    // token=JSON.parse(token);
    console.log("token........",token);
    if(!token){
        return res.status(401).json({message:"User not authenticated."})
    };
    const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY);
    // const decode = await User.find({username:token.userName});
    console.log(decode);

    if(!decode){
        return res.status(401).json({message:"Invalid token"});
        
    };
    req.id = decode.userId;
    console.log("sending........")
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;

const req = {
    id:"",
}
req.id = "sdlbgnjdfn"
