import {useContext} from "react";
import TakingPhotoAvailabilityContext from "../contexts/TakingPhotoAvailabilityContext";
import DeviceVisibilityContext from "../contexts/DeviceVisibilityContext";

const useOnTTSFinished = () => {
  const {setIsTakingPhotoAvailable} = useContext(
    TakingPhotoAvailabilityContext
  );
  const {
    setIsCameraVisible,
    setIsMegaphoneVisible,
    setIsMicrophoneVisible,
    setAreMegaphonesVisible
  } = useContext(DeviceVisibilityContext);
  return () => {
    setIsTakingPhotoAvailable(true);
    setIsCameraVisible(true);
    setIsMegaphoneVisible(true);
    setIsMicrophoneVisible(true);
    setAreMegaphonesVisible(true);
  };
};

export default useOnTTSFinished;
