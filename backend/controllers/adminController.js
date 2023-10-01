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
        
        return res.json({
          totalUsers,
          totalDoctors,
          totalApprovedDoctors,
          totalBookings,
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
          const usersWithBookings = await User.aggregate([
            {
              $lookup: {
                from: 'doctors',
                localField: 'bookings.doctorId',
                foreignField: '_id',
                as: 'doctor',
              },
            },
            {
              $unwind: '$doctor',
            },
            {
              $unwind: '$bookings',
            },
            {
              $project: {
                _id: 0,
                userName: '$name',
                userEmail: '$email',
                doctorName: '$doctor.name',
                doctorEmail: '$doctor.email',
                doctorSpecialization: '$doctor.specialization',
                date: '$bookings.date',
                slot: '$bookings.slot',
              },
            },
            {
              $addFields: {
                formattedDate: {
                  $dateToString: {
                    format: '%d/%m/%Y', // Format the date as dd/mm/yyyy
                    date: '$date',
                  },
                },
              },
            },
            {
              $group: {
                _id: {
                  userName: '$userName',
                  userEmail: '$userEmail',
                  doctorName: '$doctorName',
                  doctorEmail: '$doctorEmail',
                  doctorSpecialization: '$doctorSpecialization',
                  date: '$formattedDate',
                  slot: '$slot',
                },
              },
            },
            {
              $replaceRoot: { newRoot: '$_id' },
            },
            {
              $sort: { date: -1 },
            },
          ]);
      
          res.status(200).json(usersWithBookings);
        } catch (error) {
          res.status(500).json({ error: error.message });
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