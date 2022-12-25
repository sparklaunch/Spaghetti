import RNFS from "react-native-fs";
import useErrorHandler from "./useErrorHandler";

const useClearCache = () => {
  const errorHandler = useErrorHandler();
  return async paths => {
    try {
      for (const path of paths) {
        await RNFS.unlink(path);
      }
      console.log("Cache clear succeeded.");
    } catch (error) {
      errorHandler("CACHE_CLEAR_ERROR", error);
    }
  };
};

export default useClearCache;
