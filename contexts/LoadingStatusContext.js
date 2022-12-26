import {createContext, useState} from "react";

const LoadingStatusContext = createContext();

export const LoadingStatusContextProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingStatusContext.Provider value={{isLoading, setIsLoading}}>
      {children}
    </LoadingStatusContext.Provider>
  );
};

export default LoadingStatusContext;
