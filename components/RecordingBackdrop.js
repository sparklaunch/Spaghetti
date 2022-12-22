import {StyleSheet, Image} from "react-native";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import Video from "react-native-video";
import Constants from "../shared/Constants";

const RecordingBackdrop = () => {
  return (
    <Animated.View style={styles.block} entering={FadeIn} exiting={FadeOut}>
      <Image
        source={require("../assets/images/microphone.png")}
        style={styles.microphone}
      />
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
