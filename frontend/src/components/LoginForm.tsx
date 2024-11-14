import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from '../stores/authStore';
import { Form, Input, Button, Card, message } from 'antd';

export const LoginForm: React.FC = observer(() => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (values: { username: string; password: string }) => {
        setLoading(true);
        try {
            await authStore.login(values.username, values.password);
            message.success('Login successful');
            navigate('/chat');
        } catch (e) {
            console.log(e)
            message.error('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Login" style={{ maxWidth: 400, margin: 'auto', marginTop: '100px' }}>
            <Form layout="vertical" onFinish={handleLogin}>
                <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Log in
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="link" onClick={() => navigate('/register')} block>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
});