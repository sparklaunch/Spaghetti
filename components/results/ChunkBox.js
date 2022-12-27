import {StyleSheet, Text, View} from "react-native";
import Star from "./Star";
import Constants from "../../shared/Constants";
import phonemeToOrthographyMapper from "../../utils/phonemeToOrthographyMapper";

const ChunkBox = ({chunk, grade}) => {
  let borderColor;
  let score;
  switch (grade) {
    case 3:
      borderColor = Constants.GOOD_BORDER_COLOR;
      score = 3;
      break;
    case 2:
      borderColor = Constants.MEDIOCRE_BORDER_COLOR;
      score = 2;
      break;
    case 1:
      borderColor = Constants.BAD_BORDER_COLOR;
      score = 1;
      break;
    case 0:
      borderColor = Constants.BAD_BORDER_COLOR;
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
        <Text style={styles.chunkText}>
          {phonemeToOrthographyMapper(chunk)}
        </Text>
      </View>
      <View style={styles.starContainer}>
        <Star isFilled={score >= 1} />
        <Star isFilled={score >= 2} />
        <Star isFilled={score >= 3} />
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
    flexDirection: "row",
    justifyContent: "space-between"
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
    fontSize: 76
  }
});

export default ChunkBox;
