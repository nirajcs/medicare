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
    origin: ["https://medicarez.online","https://www.medicarez.online"],
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

const server = app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})

import { Server } from 'socket.io'

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["https://medicarez.online","https://www.medicarez.online"],
  },
}); 

io.on("connection",(socket)=>{
  console.log("connected with socket io");

  socket.on("setup",(userData)=>{
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on('join chat',(room)=>{
    socket.join(room);
    console.log("User Joined room:"+room);
  })

  socket.on('new message',(newMessageReceived)=>{
    var chat = newMessageReceived.room;
    if(!chat.user || !chat.doctor){
      return console.log('chat.users not defined')
    }
    
    if(chat.user._id === newMessageReceived.sender._id){
      socket.to(chat.doctor._id).emit("message received",newMessageReceived)
    }

    if(chat.doctor._id === newMessageReceived.sender._id){
      socket.to(chat.user._id).emit("message received",newMessageReceived)
    }
  })    
})