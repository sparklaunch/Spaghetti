import {Image, StyleSheet, View} from "react-native";

const GoodBackground = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require("../../../assets/images/sea_elephant.png")}
        style={styles.seaElephant}
      />
      <Image
        source={require("../../../assets/images/fox_train.png")}
        style={styles.foxTrain}
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
  seaElephant: {
    position: "absolute",
    bottom: 50,
    left: 30
  },
  foxTrain: {
    position: "absolute",
    bottom: 10,
    right: 10
  },
  frog: {
    position: "absolute",
    right: 40,
    top: 30
  }
});

export default GoodBackground;
