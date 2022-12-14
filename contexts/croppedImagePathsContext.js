import {createContext, useState} from "react";

const CroppedImagePathsContext = createContext({});

export const CroppedImagePathsContextProvider = ({children}) => {
  const [croppedImagePaths, setCroppedImagePaths] = useState([]);
  return (
    <CroppedImagePathsContext.Provider
      value={{croppedImagePaths, setCroppedImagePaths}}>
      {children}
    </CroppedImagePathsContext.Provider>
  );
};

export default CroppedImagePathsContext;
