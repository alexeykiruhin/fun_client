import React, { useState } from 'react';
import styles from './Auth.module.css';
import { Button, Checkbox, Form, Input } from 'antd';
import { LoginData, useLoginMutation } from '../../redux/api';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { changeVisible } from '../../redux/slices/menu';


const Auth: React.FC = () => {

  const [login] = useLoginMutation(); //   { isLoading, isError, error }
  const [errorMsg, setErrorMsg] = useState('');


  const dispatch = useDispatch();

  interface DataResponse {
    messageError: string;
    // Другие свойства, если они есть
  }

  const onFinish = async (values: LoginData) => {
    // отправляем запрос на логин
    const response = await login({ username: values.username, password: values.password });
    console.log('response', response);
    
    if ('data' in response) {
      // Теперь TypeScript знает, что response содержит data
      // Можете безопасно обратиться к data
      // Меняем вью на то которое пришло с сервера
      dispatch(changeVisible(response.data));
    }else if ('error' in response) {
      if ('data' in response.error) {
        const data = response.error.data
        // console.log('messageErrorData', data);
        if (typeof data === 'object') {
          const result = (data as DataResponse).messageError; // ОК, TypeScript понимает, что это строка
          console.log('result', result);
          setErrorMsg(result);
        }
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.Auth}>
      <div className={styles.Error}>{errorMsg}</div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Auth;