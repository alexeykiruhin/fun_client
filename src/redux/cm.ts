import { Middleware } from '@reduxjs/toolkit';
import { socket } from '../socket';
import { Message } from './slices/createRoom';
import { changeVisible } from './slices/menu';

// Подключение к серверу Socket.io

console.log('Middleware');


const socketMiddleware: Middleware = (store) => (next) => (action) => {
    if (action.type === 'socket/listenForMessages') {
        socket.connect();
        socket.on('create', (data: Message) => {
            console.log('Ответ из мидлвара:', data.stage);
            store.dispatch(changeVisible(data.stage));
        });
    }

    return next(action);
};

export default socketMiddleware;
