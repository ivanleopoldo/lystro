import { create } from "zustand";

export interface EmailStore {
  email: string;
  profileImage: string;
  storeEmail: (email: string) => void;
  setProfileImage: (image: string) => void;
}

export const useSignUpStore = create<EmailStore>((set) => ({
  email: "",
  profileImage: "",
  storeEmail: (email) => set(() => ({ email: email })),
  setProfileImage: (image) => set(() => ({ profileImage: image })),
}));
