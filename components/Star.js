import {Image, StyleSheet, View} from "react-native";

const Star = ({isFilled}) => {
  return (
    <View style={styles.container}>
      {isFilled ? (
        <Image
          source={require("../assets/images/star_filled.png")}
          style={styles.star}
        />
      ) : (
        <Image
          source={require("../assets/images/star_empty.png")}
          style={styles.star}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  star: {
    width: 30,
    height: 30
  }
});

export default Star;
