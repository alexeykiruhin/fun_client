import { io, Socket } from 'socket.io-client';


// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://127.0.0.1:5000';


export const socket: Socket = io(URL, {
  transports: ['websocket'],
  autoConnect: false,
  withCredentials: true,
  extraHeaders: {
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  }
});
