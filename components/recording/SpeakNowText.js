import {StyleSheet} from "react-native";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import Constants from "../../shared/Constants";

const SpeakNowText = () => {
  return (
    <Animated.Image
      source={require("../../assets/images/speak_now.png")}
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.speakNow}
    />
  );
};

const styles = StyleSheet.create({
  speakNow: {
    position: "absolute",
    width: 561,
    height: 33,
    top: `${Constants.TOP_OFFSET * 100}%`,
    left: "16%"
  }
});

export default SpeakNowText;
