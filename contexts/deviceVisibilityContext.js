import {createContext, useState} from "react";

const DeviceVisibilityContext = createContext();

export const DeviceVisibilityContextProvider = ({children}) => {
  const [isCameraVisible, setIsCameraVisible] = useState(true);
  const [isMegaphoneVisible, setIsMegaphoneVisible] = useState(false);
  return (
    <DeviceVisibilityContext.Provider
      value={{
        isCameraVisible,
        setIsCameraVisible,
        isMegaphoneVisible,
        setIsMegaphoneVisible
      }}>
      {children}
    </DeviceVisibilityContext.Provider>
  );
};

export default DeviceVisibilityContext;
