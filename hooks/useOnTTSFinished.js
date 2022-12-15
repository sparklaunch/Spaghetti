import {useContext} from "react";
import TakingPhotoAvailabilityContext from "../contexts/TakingPhotoAvailabilityContext";
import DeviceVisibilityContext from "../contexts/DeviceVisibilityContext";

const useOnTTSFinished = () => {
  const {setIsTakingPhotoAvailable} = useContext(
    TakingPhotoAvailabilityContext
  );
  const {setIsCameraVisible, setIsMegaphoneVisible} = useContext(
    DeviceVisibilityContext
  );
  return () => {
    setIsTakingPhotoAvailable(true);
    setIsCameraVisible(true);
    setIsMegaphoneVisible(true);
  };
};

export default useOnTTSFinished;
