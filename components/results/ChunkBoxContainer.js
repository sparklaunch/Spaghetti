import ChunkBox from "./ChunkBox";
import {StyleSheet, View} from "react-native";
import {useContext} from "react";
import ResultsContext from "../../contexts/ResultsContext";
import ChunksContext from "../../contexts/ChunksContext";

const ChunkBoxContainer = () => {
  const {results} = useContext(ResultsContext);
  const {chunks} = useContext(ChunksContext);
  const {phonemes} = results.words[0];
  const grades = phonemes.map(phoneme => {
    if (phoneme.score >= 70) {
      return 3;
    } else if (phoneme.score >= 30) {
      return 2;
    } else if (phoneme.score >= 10) {
      return 1;
    } else {
      return 0;
    }
  });
  return (
    <View style={styles.chunkBoxContainer}>
      <ChunkBox chunk={chunks[0]} grade={grades[0]} />
      <ChunkBox chunk={chunks[1]} grade={grades[1]} />
      <ChunkBox chunk={chunks[2]} grade={grades[2]} />
    </View>
  );
};

const styles = StyleSheet.create({
  chunkBoxContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ChunkBoxContainer;
