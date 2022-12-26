import {StyleSheet, TouchableOpacity} from "react-native";
import Animated, {
  BounceIn,
  BounceOut,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";
import Constants from "../shared/Constants";
import useStopRecording from "../hooks/useStopRecording";
import {useEffect} from "react";

const RecordingBackdrop = () => {
  const stopRecording = useStopRecording();
  const onPress = () => {
    stopRecording();
  };
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
    <Animated.View style={styles.block} entering={FadeIn} exiting={FadeOut}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.touchableOpacity}>
        <Animated.Image
          source={require("../assets/images/speak_now.png")}
          entering={BounceIn}
          exiting={BounceOut}
          style={styles.speakNow}
        />
        <Animated.Image
          source={require("../assets/images/glow.png")}
          style={[styles.glow, glowStyle]}
          resizeMode={"cover"}
        />
        <Animated.Image
          entering={BounceIn}
          exiting={BounceOut}
          source={require("../assets/images/microphone.png")}
          style={[styles.microphone, bulgeStyle]}
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
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  },
  touchableOpacity: {
    flex: 1
  },
  microphone: {
    position: "absolute",
    width: 120,
    height: 120,
    bottom: `${Constants.TOP_OFFSET * 100}%`,
    left: "43%"
  },
  speakNow: {
    position: "absolute",
    width: 561,
    height: 33,
    top: `${Constants.TOP_OFFSET * 100}%`,
    left: "15%"
  },
  glow: {
    position: "absolute",
    width: 300,
    height: 300,
    bottom: `${Constants.TOP_OFFSET * -60}%`,
    left: "32%"
  }
});

export default RecordingBackdrop;
