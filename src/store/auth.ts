// auth.ts

import { create } from 'zustand';

interface AuthStore {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: Boolean(localStorage.getItem('username')),
    login: () => set({ isLoggedIn: true }),
    logout: () => {
        localStorage.removeItem('username');
        set({ isLoggedIn: false });
    },
}));
