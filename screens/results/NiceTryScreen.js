import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import GoBackButton from "../../components/results/GoBackButton";
import RetryButton from "../../components/results/RetryButton";
import ChunkBoxContainer from "../../components/results/ChunkBoxContainer";
import {StyleSheet} from "react-native";
import NiceTryBackground from "../../components/results/nicetry/NiceTryBackground";
import NiceTryText from "../../components/results/nicetry/NiceTryText";
import usePlaySound from "../../hooks/usePlaySound";
import {useEffect} from "react";

const NiceTryScreen = () => {
  const playSound = usePlaySound();
  useEffect(() => {
    playSound("good", () => {});
  }, []);
  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <NiceTryBackground />
      <NiceTryText />
      <GoBackButton />
      <RetryButton />
      <ChunkBoxContainer />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 3,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFD6AC"
  }
});

export default NiceTryScreen;
