import Sound from "react-native-sound";
import useErrorHandler from "./useErrorHandler";
import phonemeToSignifierMapper from "../utils/phonemeToSignifierMapper";

const usePlaySound = () => {
  Sound.setCategory("Playback");
  const errorHandler = useErrorHandler();
  return (chunk, callback) => {
    const chunkName = phonemeToSignifierMapper(chunk);
    const sound = new Sound(
      chunkName === "click" ? "click.wav" : `${chunkName}.mp3`,
      Sound.MAIN_BUNDLE,
      error => {
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
      }
    );
  };
};

export default usePlaySound;
