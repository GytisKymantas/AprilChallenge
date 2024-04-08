import React, { createContext, PropsWithChildren, useContext } from 'react';

export const CardsContext = createContext({
  cards: {},
});

export const CardsContextProvider = ({
  cards,
  children,
}: PropsWithChildren<{
  cards: any;
}>) => {
  console.log(cards, 'cards from context');
  const value = {
    cards,
  };

  return (
    <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
  );
};

export const useExperimentsContext = () => useContext(CardsContext);
