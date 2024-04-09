import { create } from 'zustand';

export const useStore = create((set) => ({
  participants: {},
  cards: {},
  externalKeys: {},
  haveBeenLoggedIn: false,
  selectedPayment: '',
  cartItems: [],
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateParticipants: (newParticipants) =>
    set({ participants: newParticipants }),
  updateCards: (newCards) => set({ cards: newCards }),
  updateExternalKeys: (key, newExternalKey) => set({ key: newExternalKey }),
  updateHaveBeenLoggedIn: (newValue: boolean) =>
    set({ haveBeenLoggedIn: newValue }),
  updateSelectedPayment: (newValue: string) =>
    set({ selectedPayment: newValue }),
    updateCartItems: (newItem) =>
    set((state) => ({ cartItems: [...state.cartItems, newItem] })),}));
