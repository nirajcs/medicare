import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
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
            email: user.email
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
        res.status(201).json({email:user.email})
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
                });
            } else {
                res.status(201).json({error:"Invalid OTP"})
            }
        }
    }),
    getUserDetails : asyncHandler(async(req,res)=>{
        let id = req.params.id
        let user = await User.findById(id,{password:0,otp:0})
        if(user){
            res.status(200).json(user);
        }else{
            res.status(400);
            throw new Error('User not Found');
        }
    }),
    updateUser : asyncHandler(async(req,res)=>{
        const {id,name,email,mobile,blood,age,gender,emerPerson,emerNumber,password} = req.body
        let user = await User.findById(id);

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
        let doctors = await Doctor.find({},{password:0})
        if(doctors){
            res.status(200).json({doctorsData:doctors})
        }else{
            res.status(400).json({error:"Error in Fetching Doctors Data"})
        }
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