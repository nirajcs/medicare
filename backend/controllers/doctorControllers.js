import asyncHandler from "express-async-handler";
import Doctor from "../models/doctorModel.js";
import generateToken from '../utils/doctorGenerateToken.js'; 

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

    logoutDoctor : asyncHandler(async(req,res)=>{
        res.cookie('docjwt', '', {
            httpOnly: true,
            expires: new Date(0),
          });
        res.status(200).json({message:"Logout Doctor success"})
    })
}

export default doctorController;