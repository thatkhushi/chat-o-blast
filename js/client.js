//const socket = io('http://localhost:8000');
    
const socket = io('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });

const form = document.getElementById('send-container') 
const messageInput= document.getElementById('messageInp')

const messageContainer = document.querySelector(".message_container")
//var audio= new Audio('ting.mp3');


const myname=prompt("Enter your name to join: ");
socket.emit('new-user-joined',myname);

const append = (message, position)=>{	
	const messageElement = document.createElement('div');
	messageElement.innerText=message;
	if(position=='left')
	{
		messageElement.className+='left';
		messageContainer.append(messageElement);
		window.scroll(0,500)
	}
	else{
		messageElement.className+="right";
		messageContainer.append(messageElement);
		window.scroll(0,500)

		}
}


socket.on('user-joined',myname=>{
	append(`${myname} joined the chat `, 'right')
})

socket.on('receive',data=>{
	append(`${data.myname}:${data.message}`, 'left')
})

socket.on('left',myname=>{
	append(`${myname} left the chat`, 'right')
})

form.addEventListener('submit', (e)=>{
	e.preventDefault();
	const message= messageInput.value;
	append(`You: ${message}`,'right');
	socket.emit('send',message);
	messageInput.value=' '
})
