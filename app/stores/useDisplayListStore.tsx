import { create } from "zustand";

interface IDisplayListState {
  displayMode: "grid" | "list";
  toggleDisplayMode: (mode: "grid" | "list") => void;
}

export const useDisplayList = create<IDisplayListState>((set) => ({
  displayMode: "grid",
  toggleDisplayMode: (mode: "grid" | "list") => set({ displayMode: mode }),
}));
