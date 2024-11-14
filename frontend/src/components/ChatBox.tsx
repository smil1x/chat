import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useStores } from '../stores';
import { Card } from 'antd';

export const ChatBox: React.FC = observer(() => {
    const { chatStore, authStore } = useStores();

    useEffect(() => {
        if (authStore.isAuthenticated) {
            chatStore.loadChatHistory();
            chatStore.connectWebSocket();

            return () => {
                chatStore.disconnectWebSocket();
            };
        }
    }, [authStore.isAuthenticated, chatStore]);

    const handleSendMessage = async (messageText: string) => {
        await chatStore.sendMessage(messageText);
    };

    return (
        <Card title="Chat Room">
            {authStore.isAdmin && <MessageInput onSendMessage={handleSendMessage} />}
            <MessageList messages={chatStore.messages} />
        </Card>
    );
});