import { Middleware } from '@reduxjs/toolkit';
import { socket } from '../socket';
import { Message, connectPlayers, createRoom } from './slices/createRoom';
import { changeVisible } from './slices/menu';
import { updatePlayers } from './slices/createRoom';

// Подключение к серверу Socket.io

console.log('Middleware');

// Тип действия
const SOCKET_LISTEN_FOR_MESSAGES = 'socket/listenForMessages';

// Action Creator для "socket/listenForMessages"
export const socketListenForMessages = () => ({
  type: SOCKET_LISTEN_FOR_MESSAGES,
});

// Middleware
const socketMiddleware: Middleware = (store) => (next) => (action) => {
    if (action.type === SOCKET_LISTEN_FOR_MESSAGES) {
        // Подключение к серверу Socket.io
        socket.connect();
        socket.on('create', (data: Message) => {
            console.log('Ответ из мидлвара create:', data.name);
            store.dispatch(changeVisible(data.stage));
            store.dispatch(createRoom(data));
            // store.dispatch(updatePlayers(data));
        });
        // получаю состояние юзера с сервера
        socket.on('stage', (data: Message) => {
            console.log('Ответ из мидлвара stage:', data.stage);
            store.dispatch(changeVisible(data.stage));
            // store.dispatch(createRoom(room))
        });
        // получаю количество игроков в стадии ожидания
        socket.on('await_players', (data: connectPlayers) => {
            console.log('Ответ из мидлвара await:', data.users);
            store.dispatch(updatePlayers(data.users));
            // store.dispatch(createRoom(data.name))
        });
    }

    return next(action);
};

export default socketMiddleware;
