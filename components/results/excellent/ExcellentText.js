import {Image, StyleSheet} from "react-native";

const ExcellentText = () => {
  return (
    <Image
      source={require("../../../assets/images/excellent.png")}
      style={styles.excellent}
    />
  );
};

const styles = StyleSheet.create({
  excellent: {
    position: "absolute",
    top: 30,
    left: "28%"
  }
});

export default ExcellentText;
