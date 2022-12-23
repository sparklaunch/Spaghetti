import {StyleSheet} from "react-native";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";

const ExcellentScreen = () => {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn}
      exiting={FadeOut}></Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#64C137"
  }
});

export default ExcellentScreen;
