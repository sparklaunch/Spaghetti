import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import Constants from "../shared/Constants";
import {useContext} from "react";
import DeviceVisibilityContext from "../contexts/DeviceVisibilityContext";

const MegaphoneButton = ({onReplay}) => {
  const {isMegaphoneVisible} = useContext(DeviceVisibilityContext);
  return (
    <View
      style={[
        styles.playButton,
        isMegaphoneVisible || {
          display: "none"
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
    left: "50%",
    transform: [
      {
        translateY: 50
      },
      {
        translateX: -50
      }
    ]
  }
});

export default MegaphoneButton;
