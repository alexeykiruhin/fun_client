import styles from './createGame.module.css';
// import axios from 'axios';
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { changeVisible } from '../../redux/slices/menu';
// import { useGetHomeQuery } from '../../redux/api';
import { roomState } from '../../redux/slices/createRoom';
import { createRoomAsync } from '../../redux/slices/createRoom';
import { useAppDispatch } from '../../hooks'


const Game: React.FC = () => {
    const [publicity, setPublicity] = useState(false);
    // const { data, isLoading } = useGetHomeQuery();

    const dispatch = useAppDispatch()

    // Form functions
    const onFinish = (values: roomState) => {
        // socket.emit('create', values)
        dispatch(createRoomAsync(values));
        // console.log('Success:', values);
        // useCreateRoomQuery(values);
        // dispatch(changeVisible('game_stage_1'))
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

    const handleBack = () => {
        // console.log(data);
        dispatch(changeVisible('menu'))
    }
    // debugger
    return (
        <div className={styles.Game}>
            {/* {isLoading && <div>Loading...</div>}
            {data && <div>Users online: {data.users}</div>} */}
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
                    label="Игроки"
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