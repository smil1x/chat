import React, { useState } from 'react';
import { Input } from 'antd';

export const MessageInput: React.FC<{ onSendMessage: (text: string) => void }> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        onSendMessage(message);
        setMessage('');
    };

    return (
        <Input.Search
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onSearch={handleSend}
            placeholder="Enter your message"
            enterButton="Send"
        />
    );
};