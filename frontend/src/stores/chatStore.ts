import {makeAutoObservable} from 'mobx';
import {getChatMessages, sendMessage} from '../services/chatService';
import {Message} from '../types';
import {io, Socket} from 'socket.io-client';

class ChatStore {
    messages: Message[] = [];
    private socket: Socket | null = null;
    private isSocketConnected: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }


    loadChatHistory = async () => {
        const response = await getChatMessages();
        const newMessages: Message[] = response.data;

        this.messages = [
            ...this.messages,
            ...newMessages.filter(
                (newMessage) =>
                    !this.messages.some((existingMessage) => existingMessage.id === newMessage.id)
            ),
        ];
    };

    async sendMessage(messageText: string) {
        try {
            const response = await sendMessage(messageText);
            const message: Message = response.data;
            this.messages = [
                message,
                ...this.messages.filter(
                    (msg) => msg.id !== message.id),
            ];
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    connectWebSocket() {
        if (this.isSocketConnected) return;

        this.socket = io('http://localhost:3000', {auth: {token: sessionStorage.getItem('token')}});

        this.socket.on('newMessage', (message: Message) => {
            this.messages = [message, ...this.messages];
        });

        this.isSocketConnected = true;

    }

    disconnectWebSocket() {
        if (this.socket) {
            this.socket.off('newMessage');
            this.socket.close();
            this.isSocketConnected = false;
        }
    }
}

export const chatStore = new ChatStore();