import {ActivityIndicator, StyleSheet, View} from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.block}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LoadingScreen;
