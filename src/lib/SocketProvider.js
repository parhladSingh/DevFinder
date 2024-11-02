import { io } from 'socket.io-client';
import { EventEmitter } from 'events';

let socket;
const socketEmitter = new EventEmitter(); 

export const initializeSocket = () => {
    // socket = io('https://devfinderbackend.onrender.com/');
    socket = io('http://localhost:3001');


    socket.on('connect_error', (err) => {
        console.log("Error in connecting socket: " + err);
    });

    // Emit event when socket is successfully connected
    socket.on('connect', () => {
        socketEmitter.emit('socket_initialized'); // Emit the event when socket is ready
    });

    return socket;
};

export const getSocket = () => {
    return socket;
};

// Export the event emitter to be used in other components
export const socketInitializedEmitter = socketEmitter;
