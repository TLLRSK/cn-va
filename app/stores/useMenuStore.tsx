import { MenuState } from '@/types/types';
import { create } from 'zustand';

export const useMenu = create<MenuState>((set) => ({
  isMenuOpen: false,
  displayStatus: "closed",
  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));
