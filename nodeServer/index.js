import express from 'express';
import {Server} from 'socket.io';
let app = express();


let server = app.listen(`https://gorgeous-pika-bf17b8.netlify.app/`);
});

let io = new Server(server);
//server will listen incoming events
const users={};

io.on('connection', socket =>{//it will listen to different  socket connections
	socket.on('new-user-joined', myname =>{//it will listen to particular socket connection
		console.log("New user",myname);
		users[socket.id] = myname;//give a id to that user who connected
		socket.broadcast.emit('user-joined', myname);//it will give the notification of joining to all users except the one who joined...
	});
	
	socket.on('send',message=>{//if a message is sent make other users receive it
		socket.broadcast.emit('receive', {message: message, myname: users[socket.id]})
	});

	socket.on('disconnect',message=>{//if a user leaves it will give that notification to all except the one who left
		socket.broadcast.emit('left', users[socket.id]);
		delete users[socket.id];
	});
})

//node server which will handle socket io connections
//import io from "../socket.io/socket.io.js"
//const io=require('socket.io-client')(8000)
//import { io } from "socket.io-client";
//const socket = io("https://server-domain.com");
