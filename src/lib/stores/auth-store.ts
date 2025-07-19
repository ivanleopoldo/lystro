import { create } from "zustand";

export interface AuthStore {
  firstTime: boolean;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  setFirstTime: (value: boolean) => void;
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  firstTime: true,
  email: "",
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  setFirstTime: (value: boolean) => set({ firstTime: value }),
  setEmail: (email: string) => set({ email }),
  setUsername: (username: string) => set({ username }),
  setPassword: (password: string) => set({ password }),
  setFirstName: (firstName: string) => set({ firstName }),
  setLastName: (lastName: string) => set({ lastName }),
}));
