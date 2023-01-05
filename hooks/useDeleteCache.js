import FileSystem from "react-native-fs";
import useErrorHandler from "./useErrorHandler";

const useDeleteCache = () => {
  const errorHandler = useErrorHandler();
  return async path => {
    try {
      await FileSystem.unlink(path);
    } catch (error) {
      errorHandler("CACHE_DELETION_ERROR", error);
    }
  };
};

export default useDeleteCache;
