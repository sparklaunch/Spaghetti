import {Dimensions, StyleSheet, View} from "react-native";
import Chunk from "./Chunk";
import {useContext} from "react";
import ChunkAnimationContext from "../contexts/ChunkAnimationContext";
import ChunksContext from "../contexts/ChunksContext";
import Constants from "../shared/Constants";
import ChunksRefsContext from "../contexts/ChunksRefsContext";
import BoundaryBorders from "./BoundaryBorders";

const Boundary = () => {
  const {firstChunkRef, secondChunkRef, thirdChunkRef} =
    useContext(ChunksRefsContext);
  const {firstChunkAnimation, secondChunkAnimation, thirdChunkAnimation} =
    useContext(ChunkAnimationContext);
  const {chunks} = useContext(ChunksContext);
  return (
    <View
      style={[
        styles.boundary,
        {
          height: Dimensions.get("window").width / 2.52
        }
      ]}>
      <BoundaryBorders />
      <View style={styles.divider}>
        {firstChunkAnimation && <Chunk chunk={chunks[0]} ref={firstChunkRef} />}
      </View>
      <View style={styles.divider}>
        {secondChunkAnimation && (
          <Chunk chunk={chunks[1]} ref={secondChunkRef} delay={100} />
        )}
      </View>
      <View style={styles.placeholderDivider}>
        {thirdChunkAnimation && (
          <Chunk
            chunk={chunks[2]}
            ref={thirdChunkRef}
            delay={200}
            isFinalChunk={true}
          />
        )}
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
    flexDirection: "row"
  },
  divider: {
    flex: 1,
    borderRightWidth: 1,
    borderStyle: "dotted",
    borderRightColor: Constants.BOUNDARY_BORDER_COLOR
  },
  placeholderDivider: {
    flex: 1
  }
});

export default Boundary;
