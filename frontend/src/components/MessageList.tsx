import React from 'react';
import { List } from 'antd';
import { Message } from '../types';

export const MessageList: React.FC<{ messages: Message[] }> = ({ messages }) => {
    return <List
        style={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
        }}
        dataSource={messages}
        renderItem={(message) => (
            <List.Item>
                <List.Item.Meta
                    title={message.text}
                    description={new Date(message.createdAt).toString()}
                />
            </List.Item>
        )}
    />
}

