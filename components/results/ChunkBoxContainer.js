import ChunkBox from "./ChunkBox";
import {StyleSheet, View} from "react-native";

const ChunkBoxContainer = () => {
  return (
    <View style={styles.chunkBoxContainer}>
      <ChunkBox chunk={"sk"} grade={"good"} />
      <ChunkBox chunk={"ir"} grade={"mediocre"} />
      <ChunkBox chunk={"t"} grade={"bad"} />
    </View>
  );
};

const styles = StyleSheet.create({
  chunkBoxContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    transform: [
      {
        translateY: 30
      }
    ]
  }
});

export default ChunkBoxContainer;
