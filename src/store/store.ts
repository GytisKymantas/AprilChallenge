import { create } from 'zustand';



export const useStore = create((set) => ({
  participants: {},
  cards: {},
  externalKeys: {},
  haveBeenLoggedIn: false,
  selectedPayment: '',
  cartItems: [],
  updateParticipants: (newParticipants : Record<string,string>) =>
    set({ participants: newParticipants }),
  updateCards: (newCards:any) => set({ cards: newCards }),
  updateExternalKeys: (key:string, newExternalKey:string) => set({ key: newExternalKey }),
  updateHaveBeenLoggedIn: (newValue: boolean) =>
    set({ haveBeenLoggedIn: newValue }),
  updateSelectedPayment: (newValue: string) =>
    set({ selectedPayment: newValue }),
    updateCartItems: (newItem:any) =>
    set((state:any) => ({ cartItems: [...state.cartItems, newItem] })),}));
