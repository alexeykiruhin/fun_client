import { io, Socket } from 'socket.io-client';


// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://127.0.0.1:5000';

const access_token = localStorage.getItem('access_token');
// console.log('token', access_token);

// Set the JWT token as a cookie
document.cookie = `jwt_token=${access_token}; path=/;`;

export const socket: Socket = io(URL, {
  transports: ['websocket'],
  autoConnect: false,
  withCredentials: true,
  extraHeaders: {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Authorization': `Bearer ${access_token}`
  },
  query: {
    token: `${access_token}`
  }
  
});
