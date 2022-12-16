import {useContext} from "react";
import DeviceVisibilityContext from "../contexts/DeviceVisibilityContext";
import TakingPhotoAvailabilityContext from "../contexts/TakingPhotoAvailabilityContext";

const prefixes = {
  PLAY_SOUND_ERROR: "[playSound] error: ",
  AUDIO_DECODING_ERROR: "Audio decoding error.",
  PLAY_CLICK_SOUND_ERROR: "[playClickSound] error: ",
  RECOGNIZE_TEXT_ERROR: "[recognizeText] error: ",
  CROP_PHOTO_ERROR: "[cropPhoto] error: ",
  TAKE_PHOTO_ERROR: "[takePhoto] error: ",
  ON_TAP_RECOGNIZE_TEXT_ERROR: "[onTap: recognizeText] error: ",
  ON_TAP_CROP_PHOTO_ERROR: "[onTap: cropPhoto] error: ",
  ON_TAP_TAKE_PHOTO_ERROR: "[onTap: takePhoto] error: ",
  RESIZE_IMAGE_ERROR: "[resizeImage] error: ",
  ON_TAP_RESIZE_ERROR: "[onTap: resizeImage] error: ",
  CROP_IMAGE_ERROR: "[cropImage] error: ",
  ON_TAP_CROP_IMAGE_ERROR: "[onTap: cropImage] error: ",
  RECOGNIZE_CHUNKS_ERROR: "[recognizeChunks] error: ",
  ON_TAP_RECOGNIZE_CHUNKS_ERROR: "[onTap: recognizeChunks] error: ",
  TTS_ENGINE_ERROR: "TTS Engine error: ",
  CLASSIFY_CHUNKS_ERROR: "[classifyChunks] error: ",
  LOAD_ERROR: "Loading error: "
};

const useErrorHandler = () => {
  const {setIsCameraVisible} = useContext(DeviceVisibilityContext);
  const {setIsTakingPhotoAvailable} = useContext(
    TakingPhotoAvailabilityContext
  );
  return (type, error = "") => {
    console.log(`${prefixes[type]}${error.message}`);
    setIsCameraVisible(true);
    setIsTakingPhotoAvailable(true);
  };
};

export default useErrorHandler;
