import create from "zustand";

interface FAQ {
  answer: string;
  id: string;
  question: string;
}

interface globalProps {
  faqs: FAQ[];
  setFAQ: (faq: FAQ[]) => void;
}

export const useGlobal = create<globalProps>((set) => ({
  faqs: [],
  setFAQ: (faqs) => set((state) => ({ faqs })),
}));
