import {createContext, useState} from "react";

const RecordingStatusContext = createContext();

export const RecordingStatusContextProvider = ({children}) => {
  const [isRecording, setIsRecording] = useState(false);
  return (
    <RecordingStatusContext.Provider value={{isRecording, setIsRecording}}>
      {children}
    </RecordingStatusContext.Provider>
  );
};

export default RecordingStatusContext;
