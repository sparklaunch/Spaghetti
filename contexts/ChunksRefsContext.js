import {createContext, useRef} from "react";

const ChunksRefsContext = createContext();

export const ChunksRefsContextProvider = ({children}) => {
  const firstChunkRef = useRef();
  const secondChunkRef = useRef();
  const thirdChunkRef = useRef();
  return (
    <ChunksRefsContext.Provider
      value={{
        firstChunkRef,
        secondChunkRef,
        thirdChunkRef
      }}>
      {children}
    </ChunksRefsContext.Provider>
  );
};

export default ChunksRefsContext;
