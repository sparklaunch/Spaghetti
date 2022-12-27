import SoundRecorder from "react-native-sound-recorder";
import axios from "axios";
import Constants from "../shared/Constants";
import {useContext} from "react";
import ChunksContext from "../contexts/ChunksContext";
import useErrorHandler from "./useErrorHandler";
import RecordingStatusContext from "../contexts/RecordingStatusContext";
import ResultsContext from "../contexts/ResultsContext";
import ResultsStatusContext from "../contexts/ResultsStatusContext";
import LoadingStatusContext from "../contexts/LoadingStatusContext";
import useDeleteCache from "./useDeleteCache";

const useStopRecording = () => {
  const {setIsLoading} = useContext(LoadingStatusContext);
  const {chunks} = useContext(ChunksContext);
  const {setResults} = useContext(ResultsContext);
  const {setIsRecording} = useContext(RecordingStatusContext);
  const {setResultsScreenShown} = useContext(ResultsStatusContext);
  const deleteCache = useDeleteCache();
  const errorHandler = useErrorHandler();
  return async () => {
    try {
      setIsLoading(true);
      const {path} = await SoundRecorder.stop();
      console.log("Result saved in " + path);
      const formData = new FormData();
      formData.append("audio", {
        uri: "file://" + path,
        type: "audio/aac",
        name: "record.aac"
      });
      formData.append("text", chunks.join(""));
      const response = await axios.post(Constants.API_ENDPOINT, formData, {
        headers: {
          "X-API-KEY": Constants.API_KEY,
          accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      });
      await deleteCache(path);
      const {data} = response;
      setResults(data);
      setIsLoading(false);
      setResultsScreenShown(true);
    } catch (error) {
      errorHandler("RECORDING_ERROR", error);
      setIsLoading(false);
    }
    setIsRecording(false);
  };
};
export default useStopRecording;
