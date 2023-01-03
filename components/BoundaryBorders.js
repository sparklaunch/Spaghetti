import {StyleSheet, View} from "react-native";
import Constants from "../shared/Constants";

const BoundaryBorders = () => {
  return (
    <View style={styles.borderContainer}>
      <View style={styles.topLeftBorder} />
      <View style={styles.topRightBorder} />
      <View style={styles.bottomLeftBorder} />
      <View style={styles.bottomRightBorder} />
    </View>
  );
};

const styles = StyleSheet.create({
  borderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  topLeftBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    borderWidth: 8,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: Constants.PRIMARY_COLOR
  },
  topRightBorder: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    borderWidth: 8,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderColor: Constants.PRIMARY_COLOR
  },
  bottomLeftBorder: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 50,
    height: 50,
    borderWidth: 8,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderColor: Constants.PRIMARY_COLOR
  },
  bottomRightBorder: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderWidth: 8,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: Constants.PRIMARY_COLOR
  }
});

export default BoundaryBorders;
