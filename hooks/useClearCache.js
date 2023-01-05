import FileSystem from "react-native-fs";
import useErrorHandler from "./useErrorHandler";

const useClearCache = () => {
  const errorHandler = useErrorHandler();
  return async paths => {
    try {
      for (const path of paths) {
        await FileSystem.unlink(path);
      }
    } catch (error) {
      errorHandler("CACHE_CLEAR_ERROR", error);
    }
  };
};

export default useClearCache;
