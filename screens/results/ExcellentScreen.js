import {StyleSheet} from "react-native";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import ExcellentBackground from "../../components/results/excellent/ExcellentBackground";
import ExcellentText from "../../components/results/excellent/ExcellentText";
import GoBackButton from "../../components/results/GoBackButton";
import RetryButton from "../../components/results/RetryButton";
import ChunkBoxContainer from "../../components/results/ChunkBoxContainer";

const ExcellentScreen = () => {
  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <ExcellentBackground />
      <ExcellentText />
      <GoBackButton />
      <RetryButton />
      <ChunkBoxContainer />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#64C137"
  }
});

export default ExcellentScreen;
