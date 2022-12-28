import Animated, {
  BounceIn,
  BounceOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";
import {StyleSheet, View} from "react-native";
import {useEffect} from "react";
import Constants from "../../shared/Constants";

const SwellingMicrophone = () => {
  const scale = useSharedValue(1);
  const glowScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.5);
  const bulgeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value
        }
      ]
    };
  });
  const glowStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: glowScale.value
        }
      ],
      opacity: glowOpacity.value
    };
  });
  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.2, {
        duration: 850
      }),
      -1,
      true,
      () => {
        scale.value = 1;
      }
    );
    glowScale.value = withRepeat(
      withTiming(1.2, {
        duration: 850
      }),
      -1,
      true,
      () => {
        scale.value = 1;
      }
    );
    glowOpacity.value = withRepeat(
      withTiming(1, {
        duration: 850
      }),
      -1,
      true,
      () => {
        scale.value = 1;
      }
    );
  }, []);
  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/images/glow.png")}
        style={[styles.glow, glowStyle]}
        resizeMode={"cover"}
      />
      <Animated.Image
        entering={BounceIn}
        exiting={BounceOut}
        source={require("../../assets/images/microphone.png")}
        style={[styles.microphone, bulgeStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  glow: {
    position: "absolute",
    width: 300,
    height: 300,
    bottom: `${Constants.TOP_OFFSET * -60}%`,
    left: "32%"
  },
  microphone: {
    position: "absolute",
    width: 120,
    height: 120,
    bottom: `${Constants.TOP_OFFSET * 100}%`,
    left: "43%"
  }
});

export default SwellingMicrophone;
