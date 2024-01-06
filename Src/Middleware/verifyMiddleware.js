import { ApiError } from "../Utils/apiErr";
import { asyncHandler } from "../Utils/asyncHandler";
import jwt from 'jsonwebtoken'

const verifiedUser=asyncHandler(async(req,res,next)=>{
try {
    const token = req.cookies?.accessToken|| req.header("Authorization")?.replace("Bearer ","");
    if(!token){
        return res.status(401).send(new ApiError(401,"Unauthorize access"));
    }
    const decode = await jwt.verify(data,process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decode._id).select("-password -refreshToken");
    if(!user){
        throw new ApiError(401,"Invalid acccess token......");
    }
    req.user = user;
    next();
} catch (error) {
    console.log("verifiedMiddlewareErr",error);
    throw new ApiError(500,"Internal Server Error")
}
})


export{
    verifiedUser
}