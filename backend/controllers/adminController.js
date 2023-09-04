import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import generateToken from "../utils/adminGenerateToken.js";

const adminController = {
    auth:asyncHandler(async(req,res)=>{
        const {email,password} = req.body
        const admin = await Admin.findOne({email})
        if(admin && await admin.matchPassword(password)){
            generateToken(res,admin._id);
            res.status(201).json({
                _id:admin._id,
                email:admin.email
            })
        }else{
            res.status(400)
            throw new Error('Invalid mail or password')
        }
    }),
    logoutAdmin : asyncHandler(async(req,res)=>{
        res.cookie('admnjwt', '', {
            httpOnly: true,
            expires: new Date(0),
          });
        res.status(200).json({message:"Logout Admin success"})
    })
}
export default adminController;