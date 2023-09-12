import asyncHandler from "express-async-handler";
import Doctor from "../models/doctorModel.js";
import generateToken from '../utils/doctorGenerateToken.js'; 
import jwt from 'jsonwebtoken';

const doctorController = {
    authDoctor:asyncHandler(async(req,res)=>{
        const {email,password} = req.body;
        const doctor = await Doctor.findOne({email})
        if(doctor && await doctor.matchPassword(password)){
            generateToken(res, doctor._id);
            res.status(201).json({
                _id:doctor._id,
                name:doctor.name,
                email:doctor.email,
            })
        }else{
            res.status(400)
            throw new Error('Invalid mail or password')
        }
    }),
    register:asyncHandler(async(req,res)=>{
        const{name,email,specialization,address,image,experience,qualification,password} = req.body

        const doctorExists = await Doctor.findOne({email})

        if(doctorExists){
            res.status(400);
            throw new Error('User already exists');
        }

        const doctor = await Doctor.create({
            name,
            email,
            specialization,
            address,
            password,
            imagePath:req.file.filename,
            qualification,
            experience
        })

        generateToken(res, doctor._id);

        res.status(201).json({
            _id:doctor._id,
            name:doctor.name,
            email:doctor.email,
        })

    }),
    manageTime : asyncHandler(async(req,res)=>{
        const {docId,date,from,to} = req.body
        // console.log(req.body)
        // console.log("HIIIIII")

        //Decode docId from docjwt
        // let token = req.cookies.docjwt
        // console.log(token)
        // let decoded = jwt.verify(token, process.env.JWT_SECRET);
        // let docId = decoded.doctorId
        // console.log(decoded)
        // console.log(docId)

        let newTime = {date:date,fromTime:from,toTime:to}
        let doctor = await Doctor.updateOne(
            { _id: docId },
            { $push: { available: newTime } });
        if(doctor){
            res.status(201).json({
                _id:doctor._id,
                name:doctor.name,
                email:doctor.email
            })
        }else{
            res.status(400)
            throw new Error('Error Occured')
        }
        
    }),
    getTimings : asyncHandler(async(req,res)=>{
        const { id } = req.params
        let doctor = await Doctor.findOne({_id:id})
        if(doctor){
            res.status(200).json({timings:doctor.available})
        }else{
            res.status(400).json({error:"Failed to Fetch"})
        }
    }),
    deleteTimings : asyncHandler(async(req,res)=>{
        const { docId,id } = req.params
        let doctor = await Doctor.findByIdAndUpdate(docId,{$pull: { available: { _id: id } }})
        if(doctor){
            res.status(200).json({message:"Successfully Deleted"})
        }else{
            res.status(400).json({message:"Failed to Delete"})
        }
    }),
    logoutDoctor : asyncHandler(async(req,res)=>{
        res.cookie('docjwt', '', {
            httpOnly: true,
            expires: new Date(0),
          });
        res.status(200).json({message:"Logout Doctor success"})
    })
}

export default doctorController;