import {Image, StyleSheet, TouchableOpacity} from "react-native";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
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
        <Image
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
    backgroundColor: "rgba(255, 255, 255, 0.75)"
  },
  touchableOpacity: {
    flex: 1
  },
  microphone: {
    position: "absolute",
    width: 76,
    height: 76,
    bottom: `${Constants.TOP_OFFSET * 100}%`,
    left: "50%",
    transform: [
      {
        translateX: -38
      }
    ]
  }
});

export default RecordingBackdrop;
