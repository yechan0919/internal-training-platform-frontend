import { create } from 'zustand'

interface Store {
    accessToken?: string;
    setAccessToken: (token: string) => void;
}

export const useStore = create<Store>((set) => ({
    accessToken: localStorage.getItem('accessToken') || undefined,
    setAccessToken: (token) => set({ accessToken: token }),
}));
