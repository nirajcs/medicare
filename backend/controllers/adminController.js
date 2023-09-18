import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import User from '../models/userModel.js';
import Doctor from '../models/doctorModel.js'
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
    getUsers : asyncHandler(async(req,res)=>{
        let users = await User.find({},{password:0,sub:0})
        if(users){
            res.status(200).json({userData:users})
        }else{
            res.status(400).json("Error in fetching")
        }
    }),
    getDoctors : asyncHandler(async(req,res)=>{
        let doctors = await Doctor.find({},{password:0})
        if(doctors){
            res.status(200).json({doctorsData:doctors})
        }else{
            res.status(400).json("Error in Fetching")
        }
    }),
    blockUsers : asyncHandler(async(req,res)=>{
        let userId = req.params.id
        let user = await User.findById(userId)

        user.blocked = !user.blocked
        await user.save();

        if(user){
            res.status(200).json(user)
        }else{
            res.status(400).json({error:"Id invalid"})
        }
    }),
    approveDoctors : asyncHandler(async(req,res)=>{
        let docId = req.params.id
        let doctor = await Doctor.findById(docId)

        doctor.approved = !doctor.approved;
        await doctor.save();

        if(doctor){
            res.status(200).json(doctor)
        }else{
            res.status(400).json({error:"Id invalid"})
        }

    }),
    blockDoctor : asyncHandler(async(req,res)=>{
        let docId = req.params.id
        let doctor = await Doctor.findById(docId)

        doctor.blocked = !doctor.blocked;
        await doctor.save();

        if(doctor){
            res.status(200).json(doctor)
        }else{
            res.status(400).json({error:"Id invalid"})
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