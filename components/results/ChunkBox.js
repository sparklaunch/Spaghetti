import {Pressable, StyleSheet, View} from "react-native";
import Star from "./Star";
import Constants from "../../shared/Constants";
import phonemeToOrthographyMapper from "../../utils/phonemeToOrthographyMapper";
import phonemeToSignifierMapper from "../../utils/phonemeToSignifierMapper";
import usePlaySound from "../../hooks/usePlaySound";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";

const ChunkBox = ({chunk, grade, isFinalChunk = false}) => {
  let borderColor;
  const scale = useSharedValue(1);
  const bounceStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value
        }
      ]
    };
  });
  const playSound = usePlaySound();
  const onPress = () => {
    let signifiedChunk = phonemeToSignifierMapper(chunk);
    playSound(signifiedChunk, () => {}, isFinalChunk);
    scale.value = withRepeat(
      withTiming(1.5, {
        duration: 200
      }),
      2,
      true
    );
  };
  switch (grade) {
    case 3:
      borderColor = Constants.GOOD_BORDER_COLOR;
      break;
    case 2:
      borderColor = Constants.MEDIOCRE_BORDER_COLOR;
      break;
    case 1:
      borderColor = Constants.BAD_BORDER_COLOR;
      break;
    case 0:
      borderColor = Constants.BAD_BORDER_COLOR;
      break;
    default:
      break;
  }
  return (
    <Pressable onPress={onPress} style={styles.block}>
      <View
        style={[
          styles.container,
          {
            borderColor: borderColor,
            borderWidth: 5
          }
        ]}>
        <Animated.Text style={[styles.chunkText, bounceStyle]}>
          {phonemeToOrthographyMapper(chunk)}
        </Animated.Text>
      </View>
      <View style={styles.starContainer}>
        <Star isFilled={grade >= 1} />
        <Star isFilled={grade >= 2} />
        <Star isFilled={grade >= 3} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  block: {
    alignItems: "center"
  },
  starContainer: {
    width: 100,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container: {
    width: 150,
    height: 150,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  chunkText: {
    fontFamily: "Poppins-Bold",
    color: "black",
    letterSpacing: -3,
    fontSize: 76
  }
});

export default ChunkBox;
