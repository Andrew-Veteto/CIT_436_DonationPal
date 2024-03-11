import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [localStorageVariable, setLocalStorageVariable] = useState(null);

  const setLocalStorage = (value) => {
    setLocalStorageVariable(value);
  };

  return (
    <MyContext.Provider value={{ localStorageVariable, setLocalStorage }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
