import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import Constants from "../shared/Constants";
import {useContext, useState} from "react";
import DeviceVisibilityContext from "../contexts/DeviceVisibilityContext";

const MegaphoneButton = ({onReplay}) => {
  const {isMegaphoneVisible} = useContext(DeviceVisibilityContext);
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
        styles.playButton,
        isMegaphoneVisible || {
          display: "none"
        },
        {
          transform: [
            {
              translateX: -width / 2
            },
            {
              translateY: height / 2
            }
          ]
        }
      ]}>
      <TouchableOpacity activeOpacity={0.5} onPress={onReplay}>
        <Image source={require("../assets/images/megaphone.png")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  playButton: {
    position: "absolute",
    bottom: `${Constants.TOP_OFFSET * 100}%`,
    left: "50%"
  }
});

export default MegaphoneButton;