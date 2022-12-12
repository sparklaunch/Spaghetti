const prefixes = {
  PLAY_SOUND_ERROR: "[playSound] error: ",
  AUDIO_DECODING_ERROR: "Audio decoding error.",
  PLAY_CLICK_SOUND_ERROR: "[playClickSound] error: ",
  RECOGNIZE_TEXT_ERROR: "[recognizeText] error: ",
  CROP_PHOTO_ERROR: "[cropPhoto] error: ",
  TAKE_PHOTO_ERROR: "[takePhoto] error: ",
  ON_TAP_RECOGNIZE_TEXT_ERROR: "[onTap: recognizeText] error: ",
  ON_TAP_CROP_PHOTO_ERROR: "[onTap: cropPhoto] error: ",
  ON_TAP_TAKE_PHOTO_ERROR: "[onTap: takePhoto] error: "
};

const logError = (type, error = "") => {
  console.log(`${prefixes[type]}${error}`);
};

export default logError;
