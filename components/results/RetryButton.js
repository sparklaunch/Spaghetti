import {Image, StyleSheet, TouchableOpacity} from "react-native";

const RetryButton = () => {
  const retry = () => {};
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.retryButton}
      onPress={retry}>
      <Image source={require("../../assets/images/retry.png")} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  retryButton: {
    position: "absolute",
    bottom: 0,
    left: "46%"
  }
});

export default RetryButton;
