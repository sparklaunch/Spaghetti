import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {useContext, useState} from "react";
import DeviceVisibilityContext from "../contexts/DeviceVisibilityContext";
import SoundRecorder from "react-native-sound-recorder";
import useErrorHandler from "../hooks/useErrorHandler";
import RNFS from "react-native-fs";
import axios from "axios";
import base64ToBlob from "../utils/base64ToBlob";
import ChunksContext from "../contexts/ChunksContext";
import Constants from "../shared/Constants";
import RecordingStatusContext from "../contexts/RecordingStatusContext";

const MicrophoneButton = () => {
  const errorHandler = useErrorHandler();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const {isRecording, setIsRecording} = useContext(RecordingStatusContext);
  const {isMicrophoneVisible} = useContext(DeviceVisibilityContext);
  const {chunks} = useContext(ChunksContext);
  const onLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    setWidth(width);
    setHeight(height);
  };
  const startRecording = async () => {
    try {
      await SoundRecorder.start(SoundRecorder.PATH_CACHE + "/record.aac", {
        encoder: SoundRecorder.ENCODER_AAC
      });
      setIsRecording(true);
    } catch (error) {
      errorHandler("RECORDING_ERROR", error);
    }
  };
  const stopRecording = async () => {
    try {
      const {path} = await SoundRecorder.stop();
      console.log("Result saved in " + path);
      const audio = await RNFS.readFile(path, "base64");
      const blobAudio = base64ToBlob(audio);
      const audioFile = new File([blobAudio], "record.aac");
      const response = await axios.post(
        Constants.API_ENDPOINT,
        {
          audio: audioFile,
          text: chunks.join("")
        },
        {
          headers: {
            "X-API-KEY": Constants.API_KEY,
            accept: "application/json",
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(response);
    } catch (error) {
      errorHandler("RECORDING_ERROR", error);
    }
  };
  const onPress = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
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
