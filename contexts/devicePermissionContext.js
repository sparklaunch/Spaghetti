import {createContext, useState} from "react";

const DevicePermissionContext = createContext({});

export const DevicePermissionContextProvider = ({children}) => {
  const [cameraPermission, setCameraPermission] = useState();
  const [microphonePermission, setMicrophonePermission] = useState();
  return (
    <DevicePermissionContext.Provider
      value={{
        cameraPermission,
        setCameraPermission,
        microphonePermission,
        setMicrophonePermission
      }}>
      {children}
    </DevicePermissionContext.Provider>
  );
};

export default DevicePermissionContext;
