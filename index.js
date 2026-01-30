import express, { urlencoded } from 'express';
import http from 'http';
import { Server } from 'socket.io'
import Createconnection from './config/db.js';
// import socket from 'socket.io';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import { app, server } from './socket.js';
dotenv.config({});


const corsOptions = {
    origin: ['http://localhost:3000','http://192.168.2.63:3000'],
    credentials: true,  //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(urlencoded({ extended: true }))
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to chatapp')
})

// const httpserver = http.createServer(app);

// const io = new Server(httpserver,{
//     cors:{
//         origin: 'http://192.168.2.53:3000',
//         methods:['GET','POST'],
//         credentials:true
//     }
// });

// io.on('connection',(socket)=>{
//     console.log('user Connected', socket.id);
// });

// console.log = function(){}; 

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/message', messageRoutes);

const port = process.env.PORT || 8001;
Createconnection();

server.listen(port, () => console.log(`server is listern ${port}`));