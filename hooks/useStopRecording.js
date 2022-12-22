import SoundRecorder from "react-native-sound-recorder";
import RNFS from "react-native-fs";
import base64ToBlob from "../utils/base64ToBlob";
import axios from "axios";
import Constants from "../shared/Constants";
import {useContext} from "react";
import ChunksContext from "../contexts/ChunksContext";
import useErrorHandler from "./useErrorHandler";
import RecordingStatusContext from "../contexts/RecordingStatusContext";

const useStopRecording = () => {
  const {chunks} = useContext(ChunksContext);
  const {setIsRecording} = useContext(RecordingStatusContext);
  const errorHandler = useErrorHandler();
  return async () => {
    try {
      const {path} = await SoundRecorder.stop();
      console.log("Result saved in " + path);
      const audio = await RNFS.readFile(path, "base64");
      const blobAudio = base64ToBlob(audio);
      const audioFile = new File([blobAudio], "record.aac");
      const response = await axios.post(
        Constants.API_ENDPOINT,
        {
          audio: audioFile,
          text: chunks.join("")
        },
        {
          headers: {
            "X-API-KEY": Constants.API_KEY,
            accept: "application/json",
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(response);
    } catch (error) {
      errorHandler("RECORDING_ERROR", error);
    }
    setIsRecording(false);
  };
};
export default useStopRecording;
