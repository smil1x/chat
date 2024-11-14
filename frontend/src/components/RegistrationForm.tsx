import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from '../stores/authStore';
import { Form, Input, Button, Card, message } from 'antd';

export const RegistrationForm: React.FC = observer(() => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (values: { username: string; password: string }) => {
        setLoading(true);
        try {
            await authStore.register(values.username, values.password);
            message.success('Registration successful');
            navigate('/');
        } catch (e) {
            console.log(e);
            message.error('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Register" style={{ maxWidth: 400, margin: 'auto', marginTop: '100px' }}>
            <Form layout="vertical" onFinish={handleRegister}>
                <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Register
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="link" onClick={() => navigate('/')} block>
                        Back to Login
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
});