import {createContext, useState} from "react";

const ChunkAnimationContext = createContext({});

export const ChunkAnimationContextProvider = ({children}) => {
  const [firstChunkAnimation, setFirstChunkAnimation] = useState(false);
  const [secondChunkAnimation, setSecondChunkAnimation] = useState(false);
  const [thirdChunkAnimation, setThirdChunkAnimation] = useState(false);
  return (
    <ChunkAnimationContext.Provider
      value={{
        firstChunkAnimation,
        setFirstChunkAnimation,
        secondChunkAnimation,
        setSecondChunkAnimation,
        thirdChunkAnimation,
        setThirdChunkAnimation
      }}>
      {children}
    </ChunkAnimationContext.Provider>
  );
};

export default ChunkAnimationContext;
