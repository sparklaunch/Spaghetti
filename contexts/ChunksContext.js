import {createContext, useState} from "react";

const ChunksContext = createContext({});

export const ChunksContextProvider = ({children}) => {
  const [chunks, setChunks] = useState([]);
  return (
    <ChunksContext.Provider value={{chunks, setChunks}}>
      {children}
    </ChunksContext.Provider>
  );
};

export default ChunksContext;
