import RNPhotoManipulator from "react-native-photo-manipulator";
import {useContext} from "react";
import CroppedImagePathsContext from "../contexts/CroppedImagePathsContext";
import useErrorHandler from "./useErrorHandler";

const useCropImage = () => {
  const errorHandler = useErrorHandler();
  const {setCroppedImagePaths} = useContext(CroppedImagePathsContext);
  return async (path, width, height) => {
    const sharedWidth = width * 0.23;
    const sharedHeight = width * 0.3;
    const sharedYOffset = height * 0.2;
    const firstRect = {
      x: width * 0.13,
      y: sharedYOffset,
      width: sharedWidth,
      height: sharedHeight
    };
    const secondRect = {
      x: width * 0.39,
      y: sharedYOffset,
      width: sharedWidth,
      height: sharedHeight
    };
    const thirdRect = {
      x: width * 0.65,
      y: sharedYOffset,
      width: sharedWidth,
      height: sharedHeight
    };
    try {
      const firstCroppedPath = await RNPhotoManipulator.crop(
        "file://" + path,
        firstRect
      );
      const secondCroppedPath = await RNPhotoManipulator.crop(
        "file://" + path,
        secondRect
      );
      const thirdCroppedPath = await RNPhotoManipulator.crop(
        "file://" + path,
        thirdRect
      );
      const croppedPaths = [
        firstCroppedPath,
        secondCroppedPath,
        thirdCroppedPath
      ].map(croppedPath => croppedPath.replace("file://", ""));
      setCroppedImagePaths(croppedPaths);
      return croppedPaths;
    } catch (error) {
      errorHandler("CROP_IMAGE_ERROR", error);
    }
  };
};

export default useCropImage;
