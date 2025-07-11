"use client";
import React, { createContext, useState, ReactNode } from "react";

export const BalanceContext = createContext({
  balance: 100,
  totalPapatya: 0,
  totalLale: 0,
  papatyaPrice: 20,
  laleprice: 40,
  incrementFunc: (para: number) => {},
  decrementFunc: (para: number) => {},
  setTotalPapatya: (val: number | ((prev: number) => number)) => {},
  setTotalLale: (val: number | ((prev: number) => number)) => {},
});

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState(100);
  const [totalPapatya, setTotalPapatya] = useState(0);
  const [totalLale, setTotalLale] = useState(0);

  const incrementFunc = (para: number) => {
    setBalance((prev) => prev + para);
  };

  const decrementFunc = (para: number) => {
    setBalance((prev) => prev - para);
  };

  return (
    <BalanceContext.Provider
      value={{
        balance,
        totalPapatya,
        totalLale,
        papatyaPrice: 20,
        laleprice: 40,
        incrementFunc,
        decrementFunc,
        setTotalPapatya,
        setTotalLale,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
