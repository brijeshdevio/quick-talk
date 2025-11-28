import { create } from "zustand";
import type { LocalStoreType } from "@/types";

const initialState: LocalStoreType = {
  isContactModal: false,
  setIsContactModal: () => {},
};

export const useLocalStore = create<LocalStoreType>((set) => ({
  ...initialState,
  setIsContactModal: (value = false) => set(() => ({ isContactModal: value })),
}));
