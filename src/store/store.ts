import { create } from 'zustand';


interface IUseStore {
  participants:{name:string,age:string}[];
  cards:any;
  externalKeys: any,
  haveBeenLoggedIn: boolean,
  selectedPayment: string,
  cartItems: any,
  updateParticipants:any;
  updateCards:any;
  updateHaveBeenLoggedIn:any;
  updateSelectedPayment:any;
  updateCartItems:any;
}

export const useStore = create<IUseStore>((set) => ({
  participants: [],
  cards: {},
  externalKeys: {},
  haveBeenLoggedIn: false,
  selectedPayment: '',
  cartItems: [],
  updateParticipants: (newParticipants:{name:string,age:string}[]) =>
    set({ participants: newParticipants }),
  updateCards: (newCards:any) => set({ cards: newCards }),
  updateHaveBeenLoggedIn: (newValue: boolean) =>
    set({ haveBeenLoggedIn: newValue }),
  updateSelectedPayment: (newValue: string) =>
    set({ selectedPayment: newValue }),
  updateCartItems: (newItem:any) =>
    set((state:any) => ({ cartItems: [...state.cartItems, newItem] })),

  }));

