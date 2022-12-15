import Sound from "react-native-sound";
import useErrorHandler from "./useErrorHandler";

const usePlaySound = () => {
  Sound.setCategory("Playback");
  const errorHandler = useErrorHandler();
  return (chunk, callback) => {
    let chunkName;
    switch (chunk) {
      case "oo(uu)":
        chunkName = "oo_tense_u";
        break;
      case "oo(u)":
        chunkName = "oo_lax_u";
        break;
      case "ow(au)":
        chunkName = "ow_au";
        break;
      case "ow(ou)":
        chunkName = "ow_ou";
        break;
      default:
        chunkName = chunk;
        break;
    }
    const sound = new Sound(`${chunkName}.mp3`, Sound.MAIN_BUNDLE, error => {
      if (error) {
        errorHandler("PLAY_SOUND_ERROR", error);
      } else {
        sound.play(success => {
          if (success) {
            sound.release();
            callback();
          } else {
            errorHandler("AUDIO_DECODING_ERROR");
          }
        });
      }
    });
  };
};

export default usePlaySound;
