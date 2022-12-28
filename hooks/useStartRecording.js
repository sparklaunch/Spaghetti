import SoundRecorder from "react-native-sound-recorder";
import {useContext} from "react";
import RecordingStatusContext from "../contexts/RecordingStatusContext";
import useErrorHandler from "./useErrorHandler";
import useCountDown from "./useCountDown";
import useDeleteCache from "./useDeleteCache";
import RecordingRetryContext from "../contexts/RecordingRetryContext";

const useStartRecording = () => {
  const {setIsRecording} = useContext(RecordingStatusContext);
  const {setRecordingRetry} = useContext(RecordingRetryContext);
  const deleteCache = useDeleteCache();
  const errorHandler = useErrorHandler();
  const countDown = useCountDown();
  return async () => {
    try {
      await SoundRecorder.start(SoundRecorder.PATH_CACHE + "/record.aac", {
        encoder: SoundRecorder.ENCODER_AAC
      });
      setIsRecording(true);
      await countDown(6000);
      console.log("No audio input in 6,000 milliseconds.");
      const {path} = await SoundRecorder.stop();
      setRecordingRetry(true);
      await deleteCache(path);
      setIsRecording(false);
    } catch (error) {
      errorHandler("RECORDING_ERROR", error);
    }
  };
};

export default useStartRecording;
