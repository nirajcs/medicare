import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Stripe } from 'stripe'
import User from '../models/userModel.js'
import Doctor from '../models/doctorModel.js'
import generateToken from '../utils/generateToken.js'

dotenv.config()

const sendOtpLink=(email,otp)=>{
    try {
        const transporter=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.APP_EMAIL,
                pass:process.env.APP_PASSWORD
            }
        })
        const mailOptions={
            from:'MEDICARE',
            to:email,
            subject:'Email Verification',
            html:'<p>Hi,<b>'+otp+'</b> is your OTP for email verification</p>'
        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error)
            }else{
                console.log('email has been sent to:-',info.response)
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

const userController = {
    home : asyncHandler(async(req,res)=>{
        const user = {
            _id:req.user._id,
            name:req.user.name,
            email:req.user.email
        }
        res.status(200).json(user)
    }),
    //GOOGLE LOGIN
    googleLogin : asyncHandler(async(req,res)=>{
        let token = req.body.credentialResponse.credential
        let decoded = jwt.decode(token)
        const { email } = decoded
        const userExists = await User.findOne({ email });
        if (userExists && !userExists.blocked) {
            generateToken(res, userExists._id);
                res.status(201).json({
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email,
                blocked: userExists.blocked
            });
        }else{
            res.status(400).json({error:"No User Found"})
        }
    }),

    authUser : asyncHandler(async(req,res)=>{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
      
        if (user && (await user.matchPassword(password)) && !user.blocked) {
          generateToken(res, user._id);
      
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            blocked: user.blocked
          });
        } else {
          res.status(401);
          throw new Error('Either the email or password is incorrect, or the account has been blocked by the admin.');
        }
    }),
    //GOOGLE SIGN UP
    oauth:asyncHandler(async(req,res)=>{
        let token = req.body.credentialResponse.credential
        let decoded = jwt.decode(token)
        const { name, email, sub } = decoded
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({error:'User already exists'});
        }

        const user = await User.create({
            name,
            email,
            sub
        });

        if(user){
            generateToken(res, user._id);
                res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                blocked:user.blocked
            });
        }
    }),

    registerUser : asyncHandler(async(req,res)=>{
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        let newotp= Math.floor(100000 + Math.random() * 900000);
        const user = await User.create({
            name,
            email,
            password,
            otp:newotp
        });

        await sendOtpLink(user.email,user.otp)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            blocked:user.blocked
        })
    }),

    otpVerify : asyncHandler(async(req,res)=>{
        const { email,otp } = req.body

        const userExists = await User.findOne({email})

        if(userExists){
            if (userExists.otp == Number(otp)) {
                generateToken(res, userExists._id);
                res.status(201).json({
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email,
                blocked: userExists.blocked
                });
            } else {
                res.status(201).json({error:"Invalid OTP"})
            }
        }
    }),

    forgotEmailCheck : asyncHandler(async(req,res)=>{
        const { email } = req.body
        const userExists = await User.findOne({email:email})
        if(userExists && !userExists.blocked){
            let newotp= Math.floor(100000 + Math.random() * 900000);
            userExists.otp = newotp
            await userExists.save()
            sendOtpLink(userExists.email,newotp)
            res.status(200).json({
                _id:userExists._id,
                name:userExists.name,
                email:userExists.email
            })
        }else{
            res.status(400).json({error:"User not found or blocked by admin"});
        }
    }),

    forgotOtpVerify : asyncHandler(async(req,res)=>{
        const { email,otp } = req.body
        const userExists = await User.findOne({email:email})
        if(userExists.otp === Number(otp)){
            res.status(200).json({
                _id:userExists._id,
                name:userExists.name,
                email:userExists.email,
                otp:userExists.otp
            })
        }else{
            res.status(400).json({error:"OTP Incorrect"})
        }
    }),

    resetPassword : asyncHandler(async(req,res)=>{
        const { email,password } = req.body
        const userExists = await User.findOne({email:email});
        if(userExists){
            userExists.password = password;
            let changePassword = await userExists.save()
            if(changePassword){
                res.status(200).json({message:"Password Changed Successfully"})
            }else{
                res.status(400).json({error:"Failed to change the password"})
            }
        }else{
            res.status(400).json({error:"User not found"})
        }
    }),

    getUserDetails : asyncHandler(async(req,res)=>{
        const id = req.params.id
        const user = await User.findById(id,{password:0,otp:0})
        if(user){
            res.status(200).json(user);
        }else{
            res.status(400);
            throw new Error('User not Found');
        }
    }),

    updateUser : asyncHandler(async(req,res)=>{
        const {id,name,email,mobile,blood,age,gender,emerPerson,emerNumber,password} = req.body
        const user = await User.findById(id);

        user.name = name?name:user.name;
        user.email = email?email:user.email
        user.mobile = mobile?mobile:user.mobile
        user.blood = blood?blood:user.blood
        user.password = password?password:user.password
        user.age = age?age:user.age
        user.gender = gender?gender:user.gender
        user.emergency.name = emerPerson?emerPerson:user.emergency.name
        user.emergency.contact = emerNumber?emerNumber:user.emergency.contact

        let updateUser = await user.save()

        if(updateUser){
            res.status(200).json(updateUser)
        }else{
            res.status(400);
            throw new Error('Error in updating user details.');
        }
        
    }),

    getDoctors : asyncHandler(async(req,res)=>{
        const doctors = await Doctor.find({},{password:0})
        if(doctors){
            res.status(200).json({doctorsData:doctors})
        }else{
            res.status(400).json({error:"Error in Fetching Doctors Data"})
        }
    }),

    getBookings : asyncHandler(async (req, res) => {
        const { id } = req.params;
      
        try {
          const user = await User.findOne({ _id: id });
          if (!user) {
            return res.status(400).json({ error: "User not found" });
          }
      
          const userBookingDetails = await User.aggregate([
            { $match: { _id: user._id } },
            {
              $unwind: "$bookings",
            },
            {
              $lookup: {
                from: "doctors", // Assuming "doctors" is the name of your Doctor collection
                localField: "bookings.doctorId",
                foreignField: "_id",
                as: "doctor",
              },
            },
            {
              $unwind: "$doctor",
            },
            {
              $project: {
                _id: 0, // Exclude _id field
                doctorName: "$doctor.name",
                doctorSpecialization: "$doctor.specialization", // Use 'specialization' instead of 'contact'
                date: "$bookings.date",
                slot: "$bookings.slot",
              },
            },
            {
                $sort: { date: -1 }, 
            },
          ]);
      
          res.status(200).json(userBookingDetails);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }),

    payment : asyncHandler(async(req,res)=>{
        console.log(req.body)
        const { amount,user,doctor,date } = req.body
        const key = process.env.STRIPE_KEY
        console.log(key)
        const stripe = new Stripe(key);
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode: 'payment',
            line_items:[
                {
                    price_data:{
                        currency: 'inr',
                    product_data: {
                        name: date,
                    },
                    unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            success_url: `https://medicarez.online/successpayment/${user}/${doctor}/${date}`,
            cancel_url: `https://medicarez.online/doctor-details/${doctor}`
        })

        res.json({ id: session.id });
    }),

    logoutUser : asyncHandler(async(req,res)=>{
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
          });
        res.status(200).json({message:"Logout User success"})
    })
}


export default userController;