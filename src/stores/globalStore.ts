import create from "zustand";

interface FAQ {
  answer: string;
  id: string;
  question: string;
}

interface Global {
  users: string;
  total_withdrawals: string;
}

interface globalProps {
  faqs: FAQ[];
  setFAQ: (faq: FAQ[]) => void;
  global: Global;
  setGlobal: (global: Global) => void;
}

export const useGlobal = create<globalProps>((set) => ({
  faqs: [],
  global: {
    users: "",
    total_withdrawals: "",
  },
  setGlobal: (global) => set((state) => ({ global })),
  setFAQ: (faqs) => set((state) => ({ faqs })),
}));
