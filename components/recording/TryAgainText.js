import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import {Image, StyleSheet} from "react-native";
import Constants from "../../shared/Constants";

const TryAgainText = () => {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.tryAgain}>
      <Image
        source={require("../../assets/images/try_again.png")}
        resizeMethod={"scale"}
        resizeMode={"cover"}
        style={styles.text}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tryAgain: {
    position: "absolute",
    top: `${Constants.TOP_OFFSET * 100}%`,
    left: "37.5%"
  },
  text: {
    width: 214,
    height: 54
  }
});

export default TryAgainText;
