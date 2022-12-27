import SoundRecorder from "react-native-sound-recorder";
import {useContext} from "react";
import RecordingStatusContext from "../contexts/RecordingStatusContext";
import useErrorHandler from "./useErrorHandler";
import countDown from "../utils/countDown";
import LoadingStatusContext from "../contexts/LoadingStatusContext";
import ResultsStatusContext from "../contexts/ResultsStatusContext";

const useStartRecording = () => {
  const {setIsRecording} = useContext(RecordingStatusContext);
  const {isLoading} = useContext(LoadingStatusContext);
  const {resultsScreenShown} = useContext(ResultsStatusContext);
  const errorHandler = useErrorHandler();
  return async () => {
    try {
      await SoundRecorder.start(SoundRecorder.PATH_CACHE + "/record.aac", {
        encoder: SoundRecorder.ENCODER_AAC
      });
      setIsRecording(true);
      await countDown(6000);
      if (!isLoading && !resultsScreenShown) {
        console.log("No audio input in 6,000 milliseconds.");
        await SoundRecorder.stop();
        setIsRecording(false);
      }
    } catch (error) {
      errorHandler("RECORDING_ERROR", error);
    }
  };
};

export default useStartRecording;
