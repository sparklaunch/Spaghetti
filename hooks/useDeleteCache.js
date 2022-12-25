import RNFS from "react-native-fs";
import useErrorHandler from "./useErrorHandler";

const useDeleteCache = () => {
  const errorHandler = useErrorHandler();
  return async path => {
    try {
      await RNFS.unlink(path);
      console.log("Cache deletion succeeded.");
    } catch (error) {
      errorHandler("CACHE_DELETION_ERROR", error);
    }
  };
};

export default useDeleteCache;
