import { create } from 'zustand'

export const useStore = create((set) => ({
  bears: 0,
  cards:{},
  externalKeys:{},
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
  updateCards: (newCards) => set({cards:newCards}),
  updateExternalKeys: (key,newExternalKey) => set({key:newExternalKey})
}))