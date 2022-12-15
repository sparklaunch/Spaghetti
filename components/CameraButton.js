import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import Constants from "../shared/Constants";
import {useContext} from "react";
import DeviceVisibilityContext from "../contexts/DeviceVisibilityContext";

const CameraButton = ({onTap}) => {
  const {isCameraVisible} = useContext(DeviceVisibilityContext);
  return (
    <View
      style={[
        styles.tapButton,
        isCameraVisible || {
          display: "none"
        }
      ]}>
      <TouchableOpacity activeOpacity={0.5} onPress={onTap}>
        <Image source={require("../assets/images/camera.png")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tapButton: {
    position: "absolute",
    right: `${Constants.LEFT_OFFSET * 100}%`,
    top: "50%",
    transform: [
      {
        translateY: -50
      },
      {
        translateX: 50
      }
    ]
  }
});

export default CameraButton;
