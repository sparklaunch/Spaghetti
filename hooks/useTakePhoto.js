import {Platform} from "react-native";
import useErrorHandler from "./useErrorHandler";

const useTakePhoto = () => {
  const errorHandler = useErrorHandler();
  return async camera => {
    try {
      let photo;
      if (Platform.OS === "ios") {
        photo = await camera.current.takePhoto();
      } else {
        photo = await camera.current.takeSnapshot();
      }
      return photo;
    } catch (error) {
      errorHandler("TAKE_PHOTO_ERROR", error);
    }
  };
};

export default useTakePhoto;
