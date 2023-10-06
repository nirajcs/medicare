import asyncHandler from "express-async-handler";
import path from 'path'
import fs from 'fs'
import Doctor from "../models/doctorModel.js";
import generateToken from '../utils/doctorGenerateToken.js';
import User from '../models/userModel.js'
import mongoose from 'mongoose';

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
        const{name,email,specialization,fees,address,image,experience,qualification,password} = req.body
        const imagePath = req.files['file'][0].filename;
        const resumePath = req.files['resume'][0].filename;

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
            fees,
            imagePath:imagePath,
            resume:resumePath,
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
    updateDoctor:asyncHandler(async(req,res)=>{
        const{id,name,email,specialization,fees,address,experience,qualification,password} = req.body

        const doctor = await Doctor.findById(id);
        doctor.name = name
        doctor.email = email
        doctor.specialization = specialization
        doctor.address = address
        doctor.fees = fees
        doctor.qualification = qualification
        doctor.experience = experience

        if(password){
            doctor.password = password
        }

        if (req.files && req.files['file'] && req.files['file'][0] && req.files['file'][0].filename) {
            const imagePath = path.join('backend/public/images/doctors', doctor.imagePath);
            fs.unlinkSync(imagePath);
            doctor.imagePath = req.files['file'][0].filename;
        }
        
        if (req.files && req.files['resume'] && req.files['resume'][0] && req.files['resume'][0].filename) {
            const resumePath = path.join('backend/public/resumes', doctor.resume);
            fs.unlinkSync(resumePath);
            doctor.resume = req.files['resume'][0].filename;
        }

        let updateDoctor = await doctor.save();

        if(updateDoctor){
            res.status(200).json(updateDoctor)
        }else{
            res.status(400);
            throw new Error('Error in updating doctor details.');
        }
    }),
    getDoctor : asyncHandler(async(req,res)=>{
        const {id} = req.params
        const doctor = await Doctor.findOne({_id:id},{password:0})
        if(doctor){
            res.status(200).json(doctor)
        }else{
            res.status(400)
            throw new Error("Unable to find Doctor")
        }
    }),

    bookingDetails: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const doctorId = id;
      
        try {
          // Find the doctor by ID
          const doctor = await Doctor.findById(doctorId);
      
          if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
          }
      
          // Create an array to store all booking details
          const bookingDetails = [];
      
          // Iterate through the doctor's bookings
          for (const booking of doctor.bookings) {
            const bookingDate = booking.date;
            
            // Iterate through the slots for each booking
            for (const slot of booking.slots) {
              // Find the user by ID and populate user details
              const user = await User.findById(slot.userId);
      
              if (user) {
                const bookingDetail = {
                  name: user.name,
                  email: user.email,
                  blood: user.blood,
                  date: bookingDate,
                  slotNumber: booking.slots.indexOf(slot), // Slot number
                };
      
                // Push the booking detail to the array
                bookingDetails.push(bookingDetail);
              }
            }
          }
      
          res.status(200).json(bookingDetails);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }),
      
          
      
    manageTime : asyncHandler(async(req,res)=>{
        const {docId,date,from,to} = req.body
        let newTime = { date:date,fromTime:from,toTime:to,expiresAt:date }
        const doctor = await Doctor.updateOne(
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
        const doctor = await Doctor.findOne({_id:id})
        if(doctor){
            res.status(200).json({timings:doctor.available})
        }else{
            res.status(400).json({error:"Failed to Fetch"})
        }
    }),
    deleteTimings : asyncHandler(async(req,res)=>{
        const { docId,id } = req.params
        const doctor = await Doctor.findByIdAndUpdate(docId,{$pull: { available: { _id: id } }})
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