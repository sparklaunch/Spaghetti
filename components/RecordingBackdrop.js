import {StyleSheet, TouchableOpacity} from "react-native";
import Animated, {
  BounceIn,
  BounceOut,
  FadeIn,
  FadeOut
} from "react-native-reanimated";
import Constants from "../shared/Constants";
import useStopRecording from "../hooks/useStopRecording";
import {useContext} from "react";
import RecordingRetryContext from "../contexts/RecordingRetryContext";
import SwellingMicrophone from "./SwellingMicrophone";
import RecordingRetryButton from "./RecordingRetryButton";

const RecordingBackdrop = () => {
  const {recordingRetry} = useContext(RecordingRetryContext);
  const stopRecording = useStopRecording();
  const onPress = () => {
    stopRecording();
  };
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
        {recordingRetry ? <RecordingRetryButton /> : <SwellingMicrophone />}
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
  speakNow: {
    position: "absolute",
    width: 561,
    height: 33,
    top: `${Constants.TOP_OFFSET * 100}%`,
    left: "15%"
  }
});

export default RecordingBackdrop;
