import styles from './Game.module.css';
// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { socket } from '../../socket';
import { Button, Checkbox, Divider, Form, Input, InputNumber } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useDispatch } from 'react-redux';
import { changeVisible } from '../../redux/slices/menu';
import { useGetHomeQuery } from '../../redux/api';

//   надо перенести сокет на уровень приложения

// Определение типа события
interface EventData {
    // Определите свойства данных события
    stage: String
}

const Game: React.FC = () => {
    const [publicity, setPublicity] = useState(false);
    const { data, isLoading } = useGetHomeQuery();
    const handleWebSocketEvents = (socket: Socket) => {

        // Обработка события подключения
        socket.on('connect', () => {
            console.log(socket);
            console.log('Connected to WebSocket');
            // Здесь вы можете выполнить дополнительные действия при успешном подключении
            socket.emit('cnt', "duck");
        });

        // Обработка события отключения
        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket');
            // Здесь вы можете выполнить дополнительные действия при отключении
        });

        // Обработка других событий
        socket.on('create', (data: EventData) => {
            console.log('Received event:', data);
            if (data.stage === 'await') {
                console.log('AWAIT');
            }
            // Здесь вы можете обрабатывать полученные данные или выполнить нужные действия
        });



        socket.on("connect_error", (error) => {
            console.log('Error:', error);
        });
    };

    useEffect(() => {
        // Подключение к серверу Socket.IO
        socket.connect();
        // Вызов функции для обработки событий веб-сокета
        handleWebSocketEvents(socket);
        // Закрытие сокета при размонтировании компонента
        return () => {
            socket.close();
        };
    }, []);

    // Form functions
    const onFinish = (values: any) => {
        console.log('Success:', values);
        socket.emit('create', values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeCheckBox = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
        setPublicity(e.target.checked);
    };

    const onChangeNumber = (value: number | null) => {
        console.log('changed', value);
    };

    const dispatch = useDispatch();

    const handleBack = () => {
        // console.log(data);
        dispatch(changeVisible('menu'))
    }
    // debugger
    return (
        <div className={styles.Game}>
            {isLoading && <div>Loading...</div>}
            {data && <div>Users online: {data.users}</div>}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ name: '', players: 3, password: '', pub: false }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Название"
                    name="name"
                    rules={[{ message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Игроков"
                    name="players"
                // rules={[{ message: 'Please input players number!' }]}
                >
                    <InputNumber min={1} max={10} onChange={onChangeNumber} />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ message: 'Please input your password!' }]}
                >
                    <Input.Password disabled={publicity} />
                </Form.Item>

                <Form.Item name="pub" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox onChange={onChangeCheckBox}>Публичная</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="default" htmlType="submit">
                        Start
                    </Button>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="default" onClick={handleBack}>
                        Back
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Game;