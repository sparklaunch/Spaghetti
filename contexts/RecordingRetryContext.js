import {createContext, useState} from "react";

const RecordingRetryContext = createContext();

export const RecordingRetryContextProvider = ({children}) => {
  const [recordingRetry, setRecordingRetry] = useState(false);
  return (
    <RecordingRetryContext.Provider value={{recordingRetry, setRecordingRetry}}>
      {children}
    </RecordingRetryContext.Provider>
  );
};

export default RecordingRetryContext;
