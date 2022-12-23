import {createContext, useState} from "react";

const ResultsStatusContext = createContext();

export const ResultsStatusContextProvider = ({children}) => {
  const [resultsScreenShown, setResultsScreenShown] = useState(false);
  return (
    <ResultsStatusContext.Provider
      value={{resultsScreenShown, setResultsScreenShown}}>
      {children}
    </ResultsStatusContext.Provider>
  );
};

export default ResultsStatusContext;
