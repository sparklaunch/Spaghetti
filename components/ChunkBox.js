import {StyleSheet, Text, View} from "react-native";

const ChunkBox = ({chunk, grade}) => {
  let borderColor;
  switch (grade) {
    case "good":
      borderColor = "#00FF00";
      break;
    case "mediocre":
      borderColor = "#FFA06B";
      break;
    case "bad":
      borderColor = "#F23645";
      break;
    default:
      break;
  }
  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
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
