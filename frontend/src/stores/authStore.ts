import { makeAutoObservable } from 'mobx';
import { login, register } from '../services/authService';
import {User} from "../types";

class AuthStore {
    user: User | null = null;
    isAuthenticated = false;

    constructor() {
        makeAutoObservable(this);
    }

    async login(username: string, password: string) {
        const response = await login(username, password);
        const {token, ...user} = response.data
        sessionStorage.setItem('token', token)
        this.user = user;
        this.isAuthenticated = true;
    }

    async register(username: string, password: string) {
        const response = await register(username, password);
        const {token, ...user} = response.data;
        sessionStorage.setItem('token', token)
        this.user = user;
        this.isAuthenticated = true;
    }

    get isAdmin() {
        return this.user?.role === 'admin';
    }
}

export const authStore = new AuthStore();