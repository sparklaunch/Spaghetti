import {createContext, useState} from "react";

const DeviceVisibilityContext = createContext({});

export const DeviceVisibilityContextProvider = ({children}) => {
  const [isCameraVisible, setIsCameraVisible] = useState(true);
  const [isMegaphoneVisible, setIsMegaphoneVisible] = useState(false);
  const [isMicrophoneVisible, setIsMicrophoneVisible] = useState(false);
  const [areMegaphonesVisible, setAreMegaphonesVisible] = useState(false);
  return (
    <DeviceVisibilityContext.Provider
      value={{
        isCameraVisible,
        setIsCameraVisible,
        isMegaphoneVisible,
        setIsMegaphoneVisible,
        isMicrophoneVisible,
        setIsMicrophoneVisible,
        areMegaphonesVisible,
        setAreMegaphonesVisible
      }}>
      {children}
    </DeviceVisibilityContext.Provider>
  );
};

export default DeviceVisibilityContext;
