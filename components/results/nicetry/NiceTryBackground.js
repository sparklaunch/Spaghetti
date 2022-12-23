import {Image, StyleSheet, View} from "react-native";

const NiceTryBackground = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require("../../../assets/images/alligator.png")}
        style={styles.alligator}
      />
      <Image
        source={require("../../../assets/images/fox_train.png")}
        style={styles.foxTrain}
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
  alligator: {
    position: "absolute",
    bottom: 50,
    left: 30
  },
  foxTrain: {
    position: "absolute",
    bottom: 10,
    right: 10
  }
});

export default NiceTryBackground;
