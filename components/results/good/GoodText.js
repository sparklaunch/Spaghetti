import {Image, StyleSheet} from "react-native";

const GoodText = () => {
  return (
    <Image
      source={require("../../../assets/images/good.png")}
      style={styles.good}
    />
  );
};

const styles = StyleSheet.create({
  good: {
    position: "absolute",
    top: 30,
    left: "39%"
  }
});

export default GoodText;
