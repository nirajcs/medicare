import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
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
    mobile:{
      type:Number,
      default:null
    },
    password: {
      type: String,
    },
    sub:{
      type:String,
    },
    otp:{
      type:Number
    },
    gender:{
      type:String,
      default:null
    },
    emergency:{
      name:{
        type:String,
        default:null
      },
      contact:{
        type:Number,
        default:null
      }
    },
    blood:{
      type:String,
      default:null
    },
    bookings:[
      {
        doctorId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'Doctor'
        },
        date:{
          type:Date
        },
        slot:{
          type:Number
        }
      }
    ],
    age:{
      type:Number,
      default:null
    },
    blocked:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Encrypt password using bcrypt
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  

const User = mongoose.model('User', userSchema);

export default User;