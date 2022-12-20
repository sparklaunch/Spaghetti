import {createContext, useRef} from "react";

const ChunksRefsContext = createContext();

export const ChunksRefsContextProvider = ({children}) => {
  const firstChunkRef = useRef();
  const secondChunkRef = useRef();
  const thirdChunkRef = useRef();
  const wave = () => {
    firstChunkRef.current.wave();
    secondChunkRef.current.wave();
    thirdChunkRef.current.wave();
  };
  return (
    <ChunksRefsContext.Provider
      value={{
        firstChunkRef,
        secondChunkRef,
        thirdChunkRef,
        wave
      }}>
      {children}
    </ChunksRefsContext.Provider>
  );
};

export default ChunksRefsContext;
