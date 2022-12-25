import {useContext} from "react";
import DeviceVisibilityContext from "../contexts/DeviceVisibilityContext";
import TakingPhotoAvailabilityContext from "../contexts/TakingPhotoAvailabilityContext";

const prefixes = {
  PLAY_SOUND_ERROR: "Un erreur durant jouer le son.",
  AUDIO_DECODING_ERROR: "Un erreur durant décoder l'audio.",
  PLAY_CLICK_SOUND_ERROR: "Un erreur durant jouer le son de clique.",
  RECOGNIZE_TEXT_ERROR: "Un erreur durant récogniser la texte.",
  CROP_PHOTO_ERROR: "Un erreur durant cidre le photo.",
  TAKE_PHOTO_ERROR: "Un erreur durant prendre le photo.",
  ON_TAP_RECOGNIZE_TEXT_ERROR: "Un erreur durant récogniser la texte.",
  ON_TAP_CROP_PHOTO_ERROR: "Un erreur durant cidre le photo.",
  ON_TAP_TAKE_PHOTO_ERROR: "Un erreur durant prendre le photo.",
  RESIZE_IMAGE_ERROR: "Un erreur durant modifier l'image.",
  ON_TAP_RESIZE_ERROR: "Un erreur durant modifier l'image.",
  CROP_IMAGE_ERROR: "Un erreur durant cidre l'image.",
  ON_TAP_CROP_IMAGE_ERROR: "Un erreur durant cidre l'image.",
  RECOGNIZE_CHUNKS_ERROR: "Un erreur durant récogniser les pièces.",
  ON_TAP_RECOGNIZE_CHUNKS_ERROR: "Un erreur durant récogniser les pièces.",
  TTS_ENGINE_ERROR: "Un erreur durant procésser la texte.",
  CLASSIFY_CHUNKS_ERROR: "Un erreur durant classifier les pièces.",
  LOAD_ERROR: "Un erreur durant s'atrapper.",
  RECORDING_ERROR: "Un erreur durant se récorder.",
  READ_AUDIO_ERROR: "Un erreur durant lire l'audio.",
  AXIOS_ERROR: "Un erreur durant demander l'API.",
  SPLASH_SCREEN_ERROR: "Un erreur durant montre l'écran initiel.",
  CACHE_DELETION_ERROR: "Un erreur durant rémouver la cache.",
  CACHE_CLEAR_ERROR: "Un erreur durant claire les caches."
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
