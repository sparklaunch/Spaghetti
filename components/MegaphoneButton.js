import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {useContext, useState} from "react";
import DeviceVisibilityContext from "../contexts/DeviceVisibilityContext";
import ChunksRefsContext from "../contexts/ChunksRefsContext";

const MegaphoneButton = ({onReplay}) => {
  const {wave} = useContext(ChunksRefsContext);
  const onPress = () => {
    onReplay();
    wave();
  };
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
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <Image source={require("../assets/images/megaphone.png")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  playButton: {
    position: "absolute",
    bottom: "8%",
    left: "50%"
  }
});

export default MegaphoneButton;
