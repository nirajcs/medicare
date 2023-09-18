import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    specialization:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    password: {
      type: String,
      required: true,
    },
    approved:{
        type:Boolean,
        default:false
    },
    blocked:{
      type:Boolean,
      default:false
    },
    imagePath:{
      type:String,
      default:''  
    },
    resume:{
      type:String,
      default:''  
    },
    fees:{
      type:Number,
      default:0
    },
    qualification:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    available: [
      {
        date: {
          type: String, // You can use Date for the date field
        },
        fromTime: {
          type: String, // You can use String for the time fields
        },
        toTime: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
doctorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Encrypt password using bcrypt
  doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;