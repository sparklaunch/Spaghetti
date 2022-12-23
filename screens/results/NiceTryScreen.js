import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import GoodText from "../../components/results/good/GoodText";
import GoBackButton from "../../components/results/GoBackButton";
import RetryButton from "../../components/results/RetryButton";
import ChunkBoxContainer from "../../components/results/ChunkBoxContainer";
import {StyleSheet} from "react-native";
import NiceTryBackground from "../../components/results/nicetry/NiceTryBackground";

const NiceTryScreen = () => {
  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <NiceTryBackground />
      <GoodText />
      <GoBackButton />
      <RetryButton />
      <ChunkBoxContainer />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD6AC"
  }
});

export default NiceTryScreen;
