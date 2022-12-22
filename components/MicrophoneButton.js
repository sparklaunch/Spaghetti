import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {useContext, useState} from "react";
import DeviceVisibilityContext from "../contexts/DeviceVisibilityContext";
import SoundRecorder from "react-native-sound-recorder";
import useErrorHandler from "../hooks/useErrorHandler";
import RNFS from "react-native-fs";
import axios from "axios";
import {FFmpegKit} from "ffmpeg-kit-react-native";
import base64ToBlob from "../utils/base64ToBlob";

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
      SoundRecorder.start(SoundRecorder.PATH_CACHE + "/record.aac", {
        encoder: SoundRecorder.ENCODER_AAC
      })
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
          const {path} = result;
          console.log("Result saved in " + path);
          RNFS.readFile(path, "base64")
            .then(audio => {
              const blobAudio = base64ToBlob(audio);
              const audioFile = new File([blobAudio], "record");
              axios
                .post(
                  "https://api.elasolution.com/pron_v2/phoneme",
                  {
                    audio: audioFile,
                    text: "mug"
                  },
                  {
                    headers: {
                      "X-API-KEY": "afef8c94d1094b58a3fc58e743eb9913"
                    }
                  }
                )
                .then(response => {
                  console.log(response);
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              errorHandler("READ_AUDIO_ERROR", error);
            });
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
