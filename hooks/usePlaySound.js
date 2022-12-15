import Sound from "react-native-sound";
import useErrorHandler from "./useErrorHandler";

const usePlaySound = () => {
  Sound.setCategory("Playback");
  const errorHandler = useErrorHandler();
  return (chunk, callback) => {
    const sound = new Sound(`${chunk}.mp3`, Sound.MAIN_BUNDLE, error => {
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
