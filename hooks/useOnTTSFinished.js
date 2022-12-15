import {useContext} from "react";
import TakingPhotoAvailabilityContext from "../contexts/takingPhotoAvailabilityContext";
import DeviceVisibilityContext from "../contexts/deviceVisibilityContext";

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
