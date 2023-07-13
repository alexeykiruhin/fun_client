import styles from './Game.module.css';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';




// Определение типа события
interface EventData {
    // Определите свойства данных события
}

const Game = () => {

    const handleWebSocketEvents = (socket: Socket) => {
        
        
        // Обработка события подключения
        socket.on('connect', () => {
            console.log(socket);
            console.log('Connected to WebSocket');
            // Здесь вы можете выполнить дополнительные действия при успешном подключении
        });

        // Обработка события отключения
        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket');
            // Здесь вы можете выполнить дополнительные действия при отключении
        });

        // Обработка других событий
        socket.on('event', (data: EventData) => {
            console.log('Received event:', data);
            // Здесь вы можете обрабатывать полученные данные или выполнить нужные действия
        });

        socket.on("connect_error", (error) => {
            console.log('Error:', error);
          });
    };



    const get = () => {
        // const url = 'http://127.0.0.1:5000/';
        // const headers = {
        //     // 'Content-Type': 'application/json',
        //     // 'Authorization': 'Bearer your_token_here',
        //     // 'withCredentials': true,
        // };

        // axios.get(url, { headers })
        //     .then(response => {
        //         // Обработка успешного ответа
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         // Обработка ошибки
        //         console.error(error);
        //     });
        const socket = io('ws://127.0.0.1:5000', {
            transports: ['websocket'],
            timeout: 20000,
            // withCredentials: true,
            autoConnect: false,
        });
        // Подключение к серверу Socket.IO
        socket.connect();
        // Вызов функции для обработки событий веб-сокета
        handleWebSocketEvents(socket);

        // Закрытие сокета при размонтировании компонента
        return () => {
            socket.close();
        };
    }

    useEffect(() => {
        // // Создание экземпляра сокета и подключение к серверу
        // const socket: Socket = io('ws://localhost:5000/socket/game');

        // const socket = io('ws://127.0.0.1:5000', {
        //     transports: ['websocket'],
        //     // withCredentials: true,
        //     autoConnect: false,
        // });
        // // Подключение к серверу Socket.IO
        // socket.connect();
        // // Вызов функции для обработки событий веб-сокета
        // handleWebSocketEvents(socket);

        // // Закрытие сокета при размонтировании компонента
        // return () => {
        //     socket.close();
        // };
    }, []);



    return (
        <div className={styles.Game}>
            Game
            <button className={styles.Btn} onClick={get}>Get</button>
        </div>
    );
}

export default Game;