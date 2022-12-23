import {StyleSheet, View} from "react-native";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import ChunkBox from "../../components/results/ChunkBox";
import ExcellentBackground from "../../components/results/excellent/ExcellentBackground";
import ExcellentText from "../../components/results/excellent/ExcellentText";
import GoBackButton from "../../components/results/GoBackButton";
import RetryButton from "../../components/results/RetryButton";

const ExcellentScreen = () => {
  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <ExcellentBackground />
      <ExcellentText />
      <GoBackButton />
      <RetryButton />
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
  }
});

export default ExcellentScreen;
