import {useContext} from "react";
import DevicePermissionContext from "../contexts/devicePermissionContext";
import {Camera} from "react-native-vision-camera";

const useCameraAndMicrophonePermissions = () => {
  const {setCameraPermission, setMicrophonePermission} = useContext(
    DevicePermissionContext
  );
  return async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    setCameraPermission(newCameraPermission);
    setMicrophonePermission(newMicrophonePermission);
  };
};

export default useCameraAndMicrophonePermissions;
