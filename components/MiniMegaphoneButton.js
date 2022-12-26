import {Image, StyleSheet, TouchableOpacity} from "react-native";

const MiniMegaphoneButton = ({order}) => {
  const onPress = () => {};
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[
        styles.container,
        {
          left: order === "first" ? "34.5%" : "60.5%"
        }
      ]}>
      <Image
        source={require("../assets/images/megaphone.png")}
        style={styles.button}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    top: "45%",
    width: 100,
    height: 100
  },
  button: {
    width: 40,
    height: 40
  }
});

export default MiniMegaphoneButton;
