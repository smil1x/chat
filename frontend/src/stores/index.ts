import { createContext, useContext } from 'react';
import { authStore } from './authStore';
import { chatStore } from './chatStore';

export const stores = {
    authStore,
    chatStore,
};


export const StoresContext = createContext(stores);

export const useStores = () => useContext(StoresContext);