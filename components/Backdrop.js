import {StyleSheet, View} from "react-native";
import Constants from "../shared/Constants";

const Backdrop = () => {
  return (
    <View style={styles.block}>
      <View style={styles.left} />
      <View style={styles.top} />
      <View style={styles.bottom} />
      <View style={styles.right} />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  left: {
    position: "absolute",
    top: 0,
    left: 0,
    width: `${Constants.LEFT_OFFSET * 100}%`,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  top: {
    position: "absolute",
    top: 0,
    left: `${Constants.LEFT_OFFSET * 100}%`,
    width: `${100 - Constants.LEFT_OFFSET * 100 * 2}%`,
    height: `${Constants.TOP_OFFSET * 100}%`,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: `${Constants.LEFT_OFFSET * 100}%`,
    width: `${100 - Constants.LEFT_OFFSET * 100 * 2}%`,
    height: `${Constants.TOP_OFFSET * 100}%`,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  right: {
    position: "absolute",
    top: 0,
    right: 0,
    width: `${Constants.LEFT_OFFSET * 100}%`,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
});

export default Backdrop;
