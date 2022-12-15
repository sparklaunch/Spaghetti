import Tts from "react-native-tts";
import useErrorHandler from "./useErrorHandler";

const useInitializeTTS = () => {
  const errorHandler = useErrorHandler();
  return async () => {
    try {
      await Tts.setDefaultLanguage("en-US");
      await Tts.setDefaultRate(0.3);
    } catch (error) {
      errorHandler("TTS_ENGINE_ERROR", error);
    }
  };
};

export default useInitializeTTS;
