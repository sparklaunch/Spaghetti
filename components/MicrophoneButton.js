import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {useContext, useState} from "react";
import DeviceVisibilityContext from "../contexts/DeviceVisibilityContext";
import RecordingStatusContext from "../contexts/RecordingStatusContext";
import useStartRecording from "../hooks/useStartRecording";
import useStopRecording from "../hooks/useStopRecording";
import usePlaySound from "../hooks/usePlaySound";

const MicrophoneButton = () => {
  const startRecording = useStartRecording();
  const stopRecording = useStopRecording();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const playSound = usePlaySound();
  const {isRecording} = useContext(RecordingStatusContext);
  const {isMicrophoneVisible} = useContext(DeviceVisibilityContext);
  const onLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    setWidth(width);
    setHeight(height);
  };
  const onPress = () => {
    playSound("click", () => {
      if (!isRecording) {
        startRecording();
      } else {
        stopRecording();
      }
    });
  };
  return (
    <View
      onLayout={onLayout}
      style={[
        styles.speakButton,
        {
          transform: [
            {
              translateX: width / 2
            },
            {
              translateY: height / 2
            }
          ]
        },
        isMicrophoneVisible || {
          display: "none"
        }
      ]}>
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <Image source={require("../assets/images/microphone.png")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  speakButton: {
    position: "absolute",
    zIndex: 2,
    right: "5%",
    bottom: "8%"
  }
});

export default MicrophoneButton;
