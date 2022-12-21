import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {useContext, useState} from "react";
import Constants from "../shared/Constants";
import DeviceVisibilityContext from "../contexts/DeviceVisibilityContext";

const MicrophoneButton = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const {isMicrophoneVisible} = useContext(DeviceVisibilityContext);
  const onLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    setWidth(width);
    setHeight(height);
  };
  const onPress = () => {};
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
    right: `${Constants.LEFT_OFFSET * 100}%`,
    bottom: `${Constants.TOP_OFFSET * 100}%`
  }
});

export default MicrophoneButton;
