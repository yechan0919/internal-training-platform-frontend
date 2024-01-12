// auth.ts

import { create } from 'zustand';
import User from "../models/User";

interface AuthStore {
    isLoggedIn: boolean;
    user: User | null;
    setUser: (user: User | null) => void;
    login: (accessToken: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: Boolean(localStorage.getItem('username')),
    user: null,
    setUser: (user) => set({ user }),
    login: (accessToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        set({ isLoggedIn: true })
    },
    logout: () => {
        localStorage.clear();
        set({ isLoggedIn: false });
    },
}));
