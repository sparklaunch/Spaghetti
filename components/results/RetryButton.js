import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {useContext} from "react";
import ResultsStatusContext from "../../contexts/ResultsStatusContext";
import useStartRecording from "../../hooks/useStartRecording";
import usePlaySound from "../../hooks/usePlaySound";

const RetryButton = () => {
  const {setResultsScreenShown} = useContext(ResultsStatusContext);
  const startRecording = useStartRecording();
  const playSound = usePlaySound();
  const retry = () => {
    playSound("click", () => {
      setResultsScreenShown(false);
      startRecording();
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.retryButton}
      onPress={retry}>
      <Image source={require("../../assets/images/retry.png")} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  retryButton: {
    position: "absolute",
    bottom: 0,
    left: "46%"
  }
});

export default RetryButton;
