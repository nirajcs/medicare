import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

app.use('/api',userRoutes)
app.use('/api/doctors',doctorRoutes)
app.use('/api/admin',adminRoutes)

app.get('/api',(req,res)=>{
    res.send("Server is ready")
})

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})