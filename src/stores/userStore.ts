import create from "zustand";

interface Profile {
  claim_point: number;
  claim_datetime: string;
  id: string;
  createdAt: string;
  last_withdraw: number;
  referral: any;
  referrals: number;
  subset_point: number;
  telegram_id: string;
  total_withdraw: number;
  user: any;
  wallet_address: string;
}

interface Props {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}
// Need to create the claim time and more stuff this is important

export const useProfile = create<Props>((set) => ({
  profile: {
    claim_point: 0,
    claim_datetime: "",
    id: "",
    createdAt: "",
    last_withdraw: 0,
    referral: null,
    referrals: 0,
    subset_point: 0,
    telegram_id: "",
    total_withdraw: 0,
    user: null,
    wallet_address: "",
  },
  setProfile: (profile) => set((state) => ({ profile })),
}));
