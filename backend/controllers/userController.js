import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const sendOtpLink=(email,otp)=>{
    try {
        const transporter=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:"ncs7498@gmail.com",
                pass:"ifxyslgqpfkhsmpe"
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
    authUser : asyncHandler(async(req,res)=>{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
      
        if (user && (await user.matchPassword(password))) {
          generateToken(res, user._id);
      
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email
          });
        } else {
          res.status(401);
          throw new Error('Invalid email or password');
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
        console.log("got here")
        console.log(req.body)

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

    logoutUser : asyncHandler(async(req,res)=>{
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
          });
        res.status(200).json({message:"Logout User success"})
    })
}


export default userController;