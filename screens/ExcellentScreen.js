import {Image, StyleSheet} from "react-native";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";

const ExcellentScreen = () => {
  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <Image
        source={require("../assets/images/crocodile.png")}
        style={styles.crocodile}
      />
      <Image
        source={require("../assets/images/elephant.png")}
        style={styles.elephant}
      />
      <Image
        source={require("../assets/images/frog.png")}
        style={styles.frog}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#64C137"
  },
  crocodile: {
    position: "absolute",
    bottom: 50,
    left: 30
  },
  elephant: {
    position: "absolute",
    bottom: 30,
    right: 30
  },
  frog: {
    position: "absolute",
    right: 40,
    top: 30
  }
});

export default ExcellentScreen;
