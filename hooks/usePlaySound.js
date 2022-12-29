import Sound from "react-native-sound";
import useErrorHandler from "./useErrorHandler";
import phonemeToSignifierMapper from "../utils/phonemeToSignifierMapper";

const usePlaySound = () => {
  Sound.setCategory("Playback");
  const errorHandler = useErrorHandler();
  return (chunk, callback, isFinalSound = false) => {
    const chunkName = phonemeToSignifierMapper(chunk);
    let audioName;
    if (isFinalSound && (chunkName === "m" || chunkName === "n")) {
      audioName = "m_or_n.wav";
    } else if (chunkName === "click") {
      audioName = "click.wav";
    } else {
      audioName = chunkName + ".mp3";
    }
    const sound = new Sound(audioName, Sound.MAIN_BUNDLE, error => {
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
