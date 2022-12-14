import {createContext, useState} from "react";

const CroppedImagePathsContext = createContext();

export const CroppedImagePathsContextProvider = ({children}) => {
  const [paths, setPaths] = useState([]);
  return (
    <CroppedImagePathsContext.Provider value={{paths, setPaths}}>
      {children}
    </CroppedImagePathsContext.Provider>
  );
};

export default CroppedImagePathsContext;
