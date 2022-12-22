import {StyleSheet, TouchableOpacity} from "react-native";
import Animated, {
  BounceIn,
  BounceOut,
  FadeIn,
  FadeOut
} from "react-native-reanimated";
import Constants from "../shared/Constants";
import useStopRecording from "../hooks/useStopRecording";

const RecordingBackdrop = () => {
  const stopRecording = useStopRecording();
  const onPress = () => {
    stopRecording();
  };
  return (
    <Animated.View style={styles.block} entering={FadeIn} exiting={FadeOut}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.touchableOpacity}>
        <Animated.Image
          source={require("../assets/images/speak_now.png")}
          entering={BounceIn}
          exiting={BounceOut}
          style={styles.speakNow}
        />
        <Animated.Image
          entering={BounceIn}
          exiting={BounceOut}
          source={require("../assets/images/microphone.png")}
          style={styles.microphone}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  block: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  },
  touchableOpacity: {
    flex: 1
  },
  microphone: {
    position: "absolute",
    width: 76,
    height: 76,
    bottom: `${Constants.TOP_OFFSET * 100}%`,
    left: "45%"
  },
  speakNow: {
    position: "absolute",
    width: 561,
    height: 33,
    top: `${Constants.TOP_OFFSET * 100}%`,
    left: "15%"
  }
});

export default RecordingBackdrop;
