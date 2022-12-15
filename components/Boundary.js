import {StyleSheet, View} from "react-native";
import Chunk from "./Chunk";
import {useContext} from "react";
import ChunkAnimationContext from "../contexts/ChunkAnimationContext";
import ChunksContext from "../contexts/ChunksContext";
import Constants from "../shared/Constants";

const Boundary = () => {
  const {firstChunkAnimation, secondChunkAnimation, thirdChunkAnimation} =
    useContext(ChunkAnimationContext);
  const {chunks} = useContext(ChunksContext);
  return (
    <View style={styles.boundary}>
      <View style={styles.divider}>
        {firstChunkAnimation && <Chunk chunk={chunks[0]} />}
      </View>
      <View style={styles.divider}>
        {secondChunkAnimation && <Chunk chunk={chunks[1]} />}
      </View>
      <View style={styles.placeholderDivider}>
        {thirdChunkAnimation && <Chunk chunk={chunks[2]} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boundary: {
    position: "absolute",
    left: `${Constants.LEFT_OFFSET * 100}%`,
    top: `${Constants.TOP_OFFSET * 100}%`,
    right: `${Constants.LEFT_OFFSET * 100}%`,
    bottom: `${Constants.TOP_OFFSET * 100}%`,
    borderWidth: 8,
    borderColor: Constants.PRIMARY_COLOR,
    flexDirection: "row"
  },
  divider: {
    flex: 1,
    borderRightWidth: 3,
    borderRightColor: Constants.PRIMARY_COLOR
  },
  placeholderDivider: {
    flex: 1
  }
});

export default Boundary;
