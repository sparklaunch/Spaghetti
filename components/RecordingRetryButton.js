import {Image, StyleSheet, TouchableOpacity} from "react-native";
import Constants from "../shared/Constants";
import Animated, {BounceIn, BounceOut} from "react-native-reanimated";

const RecordingRetryButton = () => {
  const onPress = () => {};
  return (
    <Animated.View
      entering={BounceIn}
      exiting={BounceOut}
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
