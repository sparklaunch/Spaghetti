import {createContext, useState} from "react";

const CountDownContext = createContext();

export const CountDownContextProvider = ({children}) => {
  const [countDown, setCountDown] = useState(false);
  return (
    <CountDownContext.Provider value={{countDown, setCountDown}}>
      {children}
    </CountDownContext.Provider>
  );
};

export default CountDownContext;
