import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import ChunkBox from "../../components/results/ChunkBox";
import ExcellentBackground from "../../components/results/excellent/ExcellentBackground";
import ExcellentText from "../../components/results/excellent/ExcellentText";

const ExcellentScreen = () => {
  const goBack = () => {};
  const retry = () => {};
  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <ExcellentBackground />
      <ExcellentText />
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.backButton}
        onPress={goBack}>
        <Image source={require("../../assets/images/back.png")} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.retryButton}
        onPress={retry}>
        <Image source={require("../../assets/images/retry.png")} />
      </TouchableOpacity>
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
  backButton: {
    position: "absolute",
    top: 15,
    left: 15
  },
  retryButton: {
    position: "absolute",
    bottom: 0,
    left: "46%"
  }
});

export default ExcellentScreen;
