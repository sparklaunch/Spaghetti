import SoundRecorder from "react-native-sound-recorder";
import {useContext} from "react";
import RecordingStatusContext from "../contexts/RecordingStatusContext";
import useErrorHandler from "./useErrorHandler";
import countDown from "../utils/countDown";
import useStopRecording from "./useStopRecording";

const useStartRecording = () => {
  const {isRecording, setIsRecording} = useContext(RecordingStatusContext);
  const stopRecording = useStopRecording();
  const errorHandler = useErrorHandler();
  return async () => {
    try {
      await SoundRecorder.start(SoundRecorder.PATH_CACHE + "/record.aac", {
        encoder: SoundRecorder.ENCODER_AAC
      });
      setIsRecording(true);
      await countDown(6000);
      if (isRecording) {
        console.log("No audio input in 6,000 milliseconds.");
        stopRecording();
      }
    } catch (error) {
      errorHandler("RECORDING_ERROR", error);
    }
  };
};

export default useStartRecording;
