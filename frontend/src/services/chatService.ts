import axios from "axios";
import {API_URL} from "../utils/constants.ts";


export const getChatMessages = async () => {
    return axios.get(`${API_URL}/messages`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
}

export const sendMessage = async (messageText: string) => {
    return await axios.post(
        'http://localhost:3000/api/messages',
        {text: messageText},
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        }
    );
};