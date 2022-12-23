import {StyleSheet, View} from "react-native";

const ChunkBox = ({chunk}) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    backgroundColor: "white"
  }
});

export default ChunkBox;
