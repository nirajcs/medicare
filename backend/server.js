import express from 'express'
import path from 'path'
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

app.use(express.static('backend/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

app.use('/api',userRoutes)
app.use('/api/doctors',doctorRoutes)
app.use('/api/admin',adminRoutes)

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})