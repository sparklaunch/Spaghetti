import {Dimensions} from "react-native";
import RNPhotoManipulator from "react-native-photo-manipulator";
import {useContext} from "react";
import CroppedImagePathsContext from "../contexts/CroppedImagePathsContext";
import useErrorHandler from "./useErrorHandler";

const useCropImage = () => {
  const {setCroppedImagePaths} = useContext(CroppedImagePathsContext);
  const errorHandler = useErrorHandler();
  const {width} = Dimensions.get("window");
  const sharedWidth = width * 0.85;
  const sharedHeight = width * 0.9;
  const sharedYoffset = width * 0.45;
  const firstRect = {
    x: width * 0.45,
    y: sharedYoffset,
    width: sharedWidth,
    height: sharedHeight
  };
  const secondRect = {
    x: width * 1.35,
    y: sharedYoffset,
    width: sharedWidth,
    height: sharedHeight
  };
  const thirdRect = {
    x: width * 2.25,
    y: sharedYoffset,
    width: sharedWidth,
    height: sharedHeight
  };
  return async path => {
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
