import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {useContext, useState} from "react";
import DeviceVisibilityContext from "../contexts/DeviceVisibilityContext";
import SoundRecorder from "react-native-sound-recorder";
import useErrorHandler from "../hooks/useErrorHandler";

const MicrophoneButton = () => {
  const errorHandler = useErrorHandler();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const {isMicrophoneVisible} = useContext(DeviceVisibilityContext);
  const onLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    setWidth(width);
    setHeight(height);
  };
  const onPress = () => {
    if (!isRecording) {
      SoundRecorder.start(SoundRecorder.PATH_CACHE + "/test.mp4")
        .then(() => {
          console.log("Started recording");
          setIsRecording(true);
        })
        .catch(error => {
          errorHandler("RECORDING_ERROR", error);
        });
    } else {
      SoundRecorder.stop()
        .then(result => {
          console.log("Result saved in " + result.path);
          setIsRecording(false);
        })
        .catch(error => {
          errorHandler("RECORDING_ERROR", error);
        });
    }
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
    right: "5%",
    bottom: "8%"
  }
});

export default MicrophoneButton;
