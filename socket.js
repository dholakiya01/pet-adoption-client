import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: ['http://localhost:3000','http://192.168.2.63:3000','https://chat-app-frontend-nine-opal.vercel.app'],
        methods:['GET','POST']
    }
});

export const getReciverSoketId = (reciverId) =>{
    return usersoketMap[reciverId]
}

const usersoketMap = {} // {userId ==> socketId}

io.on('connection',(socket)=>{
    console.log('user Connected', socket.id);

    const userId = socket.handshake.query.userId;

    if(userId !== undefined){
        usersoketMap[userId] = socket.id;
    }

    io.emit('getUseronline',Object.keys(usersoketMap));

    socket.on('disconnect',()=>{
        console.log('User disconnected',socket.id);
        delete usersoketMap[userId];
        io.emit('getUseronline',Object.keys(usersoketMap))
    })
});

export {app,io,server}