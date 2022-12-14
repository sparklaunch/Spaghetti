import {createContext, useState} from "react";

const TakingPhotoAvailabilityContext = createContext();

export const TakingPhotoAvailabilityContextProvider = ({children}) => {
  const [isTakingPhotoAvailable, setIsTakingPhotoAvailable] = useState(true);
  return (
    <TakingPhotoAvailabilityContext.Provider
      value={{isTakingPhotoAvailable, setIsTakingPhotoAvailable}}>
      {children}
    </TakingPhotoAvailabilityContext.Provider>
  );
};

export default TakingPhotoAvailabilityContext;
