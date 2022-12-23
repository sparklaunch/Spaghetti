import {StyleSheet, Text, View} from "react-native";
import Star from "./Star";

const ChunkBox = ({chunk, grade}) => {
  let borderColor;
  let score;
  switch (grade) {
    case "good":
      borderColor = "#00FF00";
      score = 2;
      break;
    case "mediocre":
      borderColor = "#FFA06B";
      score = 1;
      break;
    case "bad":
      borderColor = "#F23645";
      score = 0;
      break;
    default:
      break;
  }
  return (
    <View style={styles.block}>
      <View
        style={[
          styles.container,
          {
            borderColor: borderColor,
            borderWidth: 5
          }
        ]}>
        <Text style={styles.chunkText}>{chunk}</Text>
      </View>
      <View style={styles.starContainer}>
        <Star isFilled={score >= 0} />
        <Star isFilled={score >= 1} />
        <Star isFilled={score >= 2} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    alignItems: "center"
  },
  starContainer: {
    width: 100,
    flexDirection: "row"
  },
  container: {
    width: 150,
    height: 150,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  chunkText: {
    fontFamily: "Poppins-Bold",
    color: "black",
    letterSpacing: -3,
    fontSize: 96
  }
});

export default ChunkBox;
