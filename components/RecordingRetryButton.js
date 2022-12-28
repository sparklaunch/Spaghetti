import {Image, StyleSheet, TouchableOpacity} from "react-native";
import Constants from "../shared/Constants";
import Animated, {BounceIn, FadeOut} from "react-native-reanimated";
import {useContext} from "react";
import RecordingRetryContext from "../contexts/RecordingRetryContext";
import RecordingStatusContext from "../contexts/RecordingStatusContext";
import usePlaySound from "../hooks/usePlaySound";
import useStartRecording from "../hooks/useStartRecording";

const RecordingRetryButton = () => {
  const {setRecordingRetry} = useContext(RecordingRetryContext);
  const {setIsRecording} = useContext(RecordingStatusContext);
  const startRecording = useStartRecording();
  const playSound = usePlaySound();
  const onPress = () => {
    setRecordingRetry(false);
    setIsRecording(true);
    playSound("click", () => {
      startRecording();
    });
  };
  return (
    <Animated.View
      entering={BounceIn}
      exiting={FadeOut}
      style={styles.retryButton}>
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <Image source={require("../assets/images/retry.png")} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  retryButton: {
    position: "absolute",
    width: 120,
    height: 120,
    bottom: `${Constants.TOP_OFFSET * 50}%`,
    left: "46%"
  }
});

export default RecordingRetryButton;
