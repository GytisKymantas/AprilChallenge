import { create } from 'zustand';


interface IUseStore {
  participants:{name:string,age:string}[];
  cards:any;
  haveBeenLoggedIn: boolean,
  selectedPayment: string,
  cartItems: any,
  updateParticipants:(value:{name:string,age:string}[])=>void;
  updateCards:any;
  updateHaveBeenLoggedIn:(value:boolean)=>void;
  updateSelectedPayment:(value:string)=>void;
  updateCartItems:any;
}

export const useStore = create<IUseStore>((set) => ({
  participants: [],
  cards: {},
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

