import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {useContext, useState} from "react";
import DeviceVisibilityContext from "../contexts/DeviceVisibilityContext";

const CameraButton = ({onTap}) => {
  const {isCameraVisible} = useContext(DeviceVisibilityContext);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const onLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    setWidth(width);
    setHeight(height);
  };
  return (
    <View
      onLayout={onLayout}
      style={[
        styles.tapButton,
        isCameraVisible || {
          display: "none"
        },
        {
          transform: [
            {
              translateX: width / 2
            },
            {
              translateY: -height / 2
            }
          ]
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
    zIndex: 1,
    right: "5%",
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
