import {StyleSheet, View} from "react-native";
import Constants from "../shared/Constants";

const MaskElement = () => {
  return (
    <View style={styles.maskElement}>
      <View style={styles.rectangle} />
    </View>
  );
};

const styles = StyleSheet.create({
  maskElement: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  rectangle: {
    width: `${(1 - Constants.LEFT_OFFSET * 2) * 100}%`,
    height: `${(1 - Constants.TOP_OFFSET * 2) * 100}%`,
    overflow: "hidden",
    backgroundColor: "black"
  }
});

export default MaskElement;
