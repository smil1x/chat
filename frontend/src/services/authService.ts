import axios from 'axios';
import {API_URL} from "../utils/constants.ts";

export const register = async (username: string, password: string) => {
    return axios.post(`${API_URL}/auth/signup`, { username, password });
};

export const login = async (username: string, password: string) => {
    return axios.post(`${API_URL}/auth/login`, { username, password });
};