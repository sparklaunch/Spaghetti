import {StyleSheet} from "react-native";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";

const RecordingBackdrop = () => {
  return (
    <Animated.View
      style={styles.block}
      entering={FadeIn}
      exiting={FadeOut}></Animated.View>
  );
};

const styles = StyleSheet.create({
  block: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)"
  }
});

export default RecordingBackdrop;
