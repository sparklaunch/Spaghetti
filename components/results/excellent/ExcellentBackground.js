import {Image, StyleSheet, View} from "react-native";

const ExcellentBackground = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require("../../../assets/images/crocodile.png")}
        style={styles.crocodile}
      />
      <Image
        source={require("../../../assets/images/elephant.png")}
        style={styles.elephant}
      />
      <Image
        source={require("../../../assets/images/frog.png")}
        style={styles.frog}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  crocodile: {
    position: "absolute",
    bottom: 50,
    left: 30
  },
  elephant: {
    position: "absolute",
    bottom: 30,
    right: 30
  },
  frog: {
    position: "absolute",
    right: 40,
    top: 30
  }
});

export default ExcellentBackground;
