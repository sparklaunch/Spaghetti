import {useContext} from "react";
import TimerContext from "../contexts/TimerContext";

const useCountDown = () => {
  const {setTimer} = useContext(TimerContext);
  return duration => {
    return new Promise((resolve, _) => {
      let timer = setTimeout(() => {
        resolve("success");
      }, duration);
      setTimer(timer);
    });
  };
};

export default useCountDown;
