import {ActivityIndicator, StyleSheet} from "react-native";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";

const LoadingScreen = () => {
  return (
    <Animated.View style={styles.block} entering={FadeIn} exiting={FadeOut}>
      <ActivityIndicator size={"large"} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  block: {
    position: "absolute",
    zIndex: 3,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LoadingScreen;
