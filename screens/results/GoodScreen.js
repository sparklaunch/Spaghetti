import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import GoBackButton from "../../components/results/GoBackButton";
import RetryButton from "../../components/results/RetryButton";
import ChunkBoxContainer from "../../components/results/ChunkBoxContainer";
import {StyleSheet} from "react-native";
import GoodBackground from "../../components/results/good/GoodBackground";
import GoodText from "../../components/results/good/GoodText";
import usePlaySound from "../../hooks/usePlaySound";
import {useEffect} from "react";

const GoodScreen = () => {
  const playSound = usePlaySound();
  useEffect(() => {
    playSound("good", () => {});
  }, []);
  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <GoodBackground />
      <GoodText />
      <GoBackButton />
      <RetryButton />
      <ChunkBoxContainer />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#80CDEF"
  }
});

export default GoodScreen;
