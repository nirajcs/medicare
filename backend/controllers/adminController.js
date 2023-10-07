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

    allDetails : asyncHandler(async(req,res)=>{
      try {
        const totalUsers = await User.countDocuments();
        
        const totalDoctors = await Doctor.countDocuments();
        
        const totalApprovedDoctors = await Doctor.countDocuments({ approved: true });
        
        const allUsers = await User.find({});
        const totalBookings = allUsers.reduce((total, user) => total + user.bookings.length, 0);

        // Create an array to store monthly booking counts (initialize with zeros)
        const monthlyCounts = Array(12).fill(0);

        allUsers.forEach((user) => {
          user.bookings.forEach((booking) => {
            const createdAt = new Date(booking.createdAt);
            const month = createdAt.getMonth(); // Months are zero-based
    
            // Increment the count for the month
            monthlyCounts[month]++;
          });
        });
        
        return res.json({
          totalUsers,
          totalDoctors,
          totalApprovedDoctors,
          totalBookings,
          monthlyCounts
        });
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
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

    getBookings: asyncHandler(async (req, res) => {
      try {
        // Find all users with their bookings and populate the doctorId
        const users = await User.find({}).populate({
          path: 'bookings.doctorId', // Populate the 'doctorId' field in the 'bookings' array
          select: 'name email specialization', // Select the fields you want from the doctor document
        });
    
        // Create an array to hold the result
        const result = [];
    
        // Loop through users and their bookings
        users.forEach((user) => {
          user.bookings.forEach((booking) => {
            // Convert the date to 'dd/mm/yyyy' format
            const bookingDate = new Date(booking.date);
            const formattedDate = `${bookingDate.getDate()}/${bookingDate.getMonth() + 1}/${bookingDate.getFullYear()}`;
    
            // Create a booking document with user details, doctor details, and formatted date
            const bookingDetails = {
              userName: user.name,
              userEmail: user.email,
              doctorName: booking.doctorId.name,
              doctorEmail: booking.doctorId.email,
              doctorSpecialization: booking.doctorId.specialization,
              date: formattedDate, // Use the formatted date
              slot: booking.slot,
            };
    
            // Add the booking document to the result array
            result.push(bookingDetails);
          });
        });
    
        // Send the result as a JSON response
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    
    }),
      
    blockUsers : asyncHandler(async(req,res)=>{
        let userId = req.params.id
        let user = await User.findById(userId)

        user.blocked = !user.blocked
        await user.save();

        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                blocked:user.blocked
            })
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