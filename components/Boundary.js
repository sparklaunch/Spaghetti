import {Dimensions, StyleSheet, View} from "react-native";
import Chunk from "./Chunk";
import {useContext} from "react";
import ChunkAnimationContext from "../contexts/ChunkAnimationContext";
import ChunksContext from "../contexts/ChunksContext";
import Constants from "../shared/Constants";
import ChunksRefsContext from "../contexts/ChunksRefsContext";

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
      <View style={styles.borderContainer}>
        <View style={styles.topLeftBorder} />
        <View style={styles.topRightBorder} />
        <View style={styles.bottomLeftBorder} />
        <View style={styles.bottomRightBorder} />
      </View>
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
  },
  borderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  topLeftBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    borderWidth: 8,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: Constants.PRIMARY_COLOR
  },
  topRightBorder: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    borderWidth: 8,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderColor: Constants.PRIMARY_COLOR
  },
  bottomLeftBorder: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 50,
    height: 50,
    borderWidth: 8,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderColor: Constants.PRIMARY_COLOR
  },
  bottomRightBorder: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderWidth: 8,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: Constants.PRIMARY_COLOR
  }
});

export default Boundary;
