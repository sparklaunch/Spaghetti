import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import ExcellentText from "../../components/results/excellent/ExcellentText";
import GoBackButton from "../../components/results/GoBackButton";
import RetryButton from "../../components/results/RetryButton";
import ChunkBoxContainer from "../../components/results/ChunkBoxContainer";
import {StyleSheet} from "react-native";
import GoodBackground from "../../components/results/good/GoodBackground";

const GoodScreen = () => {
  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <GoodBackground />
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
    backgroundColor: "#80CDEF"
  }
});

export default GoodScreen;
