import {StyleSheet, TouchableOpacity} from "react-native";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import useStopRecording from "../../hooks/useStopRecording";
import {useContext} from "react";
import RecordingRetryContext from "../../contexts/RecordingRetryContext";
import SwellingMicrophone from "./SwellingMicrophone";
import RecordingRetryButton from "./RecordingRetryButton";
import SpeakNowText from "./SpeakNowText";
import TryAgainText from "./TryAgainText";

const RecordingBackdrop = () => {
  const {recordingRetry} = useContext(RecordingRetryContext);
  const stopRecording = useStopRecording();
  const onPress = () => {
    stopRecording();
  };
  return (
    <Animated.View style={styles.block} entering={FadeIn} exiting={FadeOut}>
      {recordingRetry ? <TryAgainText /> : <SpeakNowText />}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.touchableOpacity}>
        {recordingRetry ? <RecordingRetryButton /> : <SwellingMicrophone />}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  block: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  },
  touchableOpacity: {
    flex: 1
  }
});

export default RecordingBackdrop;
