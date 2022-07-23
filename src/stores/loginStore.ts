import create from "zustand";

interface USER {
  access: string;
  setAccess: (access: string) => void;
  setIsLogIn: (data: boolean) => void;
  isLoggedIn: boolean;
  onLogin: boolean;
  setOnLogin: (data: boolean) => void;
  ref: string | null;
  setRef: (ref: string) => void;
}

export const useLogin = create<USER>((set) => ({
  access: "",
  isLoggedIn: false,
  onLogin: true,
  ref: null,

  setRef: (ref) => set((state) => ({ ...state, ref })),
  setAccess: (access) => set((state) => ({ ...state, access })),
  setIsLogIn: (data) => set((state) => ({ ...state, isLoggedIn: data })),

  setOnLogin: (data) => set((state) => ({ ...state, onLogin: data })),
}));
