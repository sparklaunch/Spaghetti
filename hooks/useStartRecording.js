import SoundRecorder from "react-native-sound-recorder";
import {useContext} from "react";
import RecordingStatusContext from "../contexts/RecordingStatusContext";
import useErrorHandler from "./useErrorHandler";

const useStartRecording = () => {
  const {setIsRecording} = useContext(RecordingStatusContext);
  const errorHandler = useErrorHandler();
  return async () => {
    try {
      await SoundRecorder.start(SoundRecorder.PATH_CACHE + "/record.aac", {
        encoder: SoundRecorder.ENCODER_AAC
      });
      setIsRecording(true);
    } catch (error) {
      errorHandler("RECORDING_ERROR", error);
    }
  };
};

export default useStartRecording;
