import {Image, StyleSheet} from "react-native";

const NiceTryText = () => {
  return (
    <Image
      source={require("../../../assets/images/nicetry.png")}
      style={styles.niceTry}
    />
  );
};

const styles = StyleSheet.create({
  niceTry: {
    position: "absolute",
    top: 30,
    left: "35%"
  }
});

export default NiceTryText;
