import {Image, StyleSheet, View} from "react-native";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import ChunkBox from "../components/ChunkBox";

const ExcellentScreen = () => {
  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/crocodile.png")}
          style={styles.crocodile}
        />
        <Image
          source={require("../assets/images/elephant.png")}
          style={styles.elephant}
        />
        <Image
          source={require("../assets/images/frog.png")}
          style={styles.frog}
        />
      </View>
      <Image
        source={require("../assets/images/excellent.png")}
        style={styles.excellent}
      />
      <View style={styles.chunkBoxContainer}>
        <ChunkBox chunk={"sk"} grade={"good"} />
        <ChunkBox chunk={"ir"} grade={"mediocre"} />
        <ChunkBox chunk={"t"} grade={"bad"} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#64C137"
  },
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
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  crocodile: {
    position: "absolute",
    bottom: 50,
    left: 30
  },
  elephant: {
    position: "absolute",
    bottom: 30,
    right: 30
  },
  frog: {
    position: "absolute",
    right: 40,
    top: 30
  },
  excellent: {
    position: "absolute",
    top: 30,
    left: "28%"
  }
});

export default ExcellentScreen;
