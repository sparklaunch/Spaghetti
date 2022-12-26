import {Image, StyleSheet, TouchableOpacity} from "react-native";
import Tts from "react-native-tts";
import {useContext} from "react";
import ChunksContext from "../contexts/ChunksContext";
import Animated, {BounceIn, BounceOut} from "react-native-reanimated";

const MiniMegaphoneButton = ({order}) => {
  const {chunks} = useContext(ChunksContext);
  const onPress = () => {
    if (order === "first") {
      Tts.speak(chunks[0] + chunks[1]);
    } else {
      Tts.speak(chunks[1] + chunks[2]);
    }
  };
  return (
    <Animated.View
      style={[
        styles.block,
        {
          top: "45%",
          left: order === "first" ? "34.5%" : "60.5%"
        }
      ]}
      entering={BounceIn}
      exiting={BounceOut}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.container}>
        <Image
          source={require("../assets/images/megaphone.png")}
          style={styles.button}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  block: {
    position: "absolute"
  },
  container: {
    position: "absolute",
    width: 100,
    height: 100
  },
  button: {
    width: 40,
    height: 40
  }
});

export default MiniMegaphoneButton;
