import {createContext, useState} from "react";

const ResultsContext = createContext();

export const ResultsContextProvider = ({children}) => {
  const [results, setResults] = useState({});
  return (
    <ResultsContext.Provider value={{results, setResults}}>
      {children}
    </ResultsContext.Provider>
  );
};

export default ResultsContext;
