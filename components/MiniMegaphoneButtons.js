import {StyleSheet, View} from "react-native";
import MiniMegaphoneButton from "./MiniMegaphoneButton";

const MiniMegaphoneButtons = () => {
  return (
    <View style={styles.container}>
      <MiniMegaphoneButton />
      <MiniMegaphoneButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default MiniMegaphoneButtons;
