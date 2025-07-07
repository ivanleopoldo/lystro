import { create } from "zustand";

export interface EmailStore {
  email: string;
  profileImage: string;
  firstTime: boolean;
  setFirstTime: (value: boolean) => void;
  storeEmail: (email: string) => void;
  setProfileImage: (image: string) => void;
}

export const useSignUpStore = create<EmailStore>((set) => ({
  email: "",
  profileImage: "",
  firstTime: true,
  setFirstTime: (value) => set(() => ({ firstTime: value })),
  storeEmail: (email) => set(() => ({ email: email })),
  setProfileImage: (image) => set(() => ({ profileImage: image })),
}));
