import {Pressable, StyleSheet, Text, View} from "react-native";
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useState
} from "react";
import Sound from "react-native-sound";
import Constants from "../shared/Constants";
import phonemeToSignifierMapper from "../utils/phonemeToSignifierMapper";
import phonemeToOrthographyMapper from "../utils/phonemeToOrthographyMapper";
import Animated, {
  BounceIn,
  BounceOut,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming
} from "react-native-reanimated";

Sound.setCategory("Playback");

const Chunk = forwardRef(({chunk, delay = 0, isFinalChunk = false}, ref) => {
  const [visibleChunk, setVisibleChunk] = useState(chunk);
  const tapScale = useSharedValue(1);
  useImperativeHandle(ref, () => {
    return {
      wave: () => {
        tapScale.value = withDelay(
          delay,
          withRepeat(
            withTiming(2, {
              duration: 200
            }),
            2,
            true,
            () => {
              tapScale.value = 1;
            }
          )
        );
      }
    };
  });
  const bounceStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: tapScale.value
        }
      ]
    };
  });
  const onTapChunk = () => {
    const chunkName = phonemeToSignifierMapper(chunk);
    tapScale.value = withRepeat(
      withTiming(2, {
        duration: 250
      }),
      2,
      true,
      () => {
        tapScale.value = 1;
      }
    );
    let audio;
    if (isFinalChunk && (chunkName === "n" || chunkName === "m")) {
      audio = "m_or_n.wav";
    } else {
      audio = chunkName + ".mp3";
    }
    const sound = new Sound(audio, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("PLAY_SOUND_ERROR: ", error);
      } else {
        sound.play(success => {
          if (success) {
            sound.release();
          } else {
            console.log("PLAY_SOUND_ERROR");
          }
        });
      }
    });
  };
  useLayoutEffect(() => {
    const visibleChunk = phonemeToOrthographyMapper(chunk);
    setVisibleChunk(visibleChunk);
  }, []);
  return (
    <Animated.View
      style={[styles.block, bounceStyle]}
      entering={BounceIn}
      exiting={BounceOut}
      ref={ref}
      layout={Layout.duration(200)}>
      <View style={styles.block}>
        <Pressable onPress={onTapChunk}>
          <Text style={styles.text}>{visibleChunk}</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontFamily: "Poppins-Bold",
    fontSize: 120,
    color: Constants.PRIMARY_COLOR,
    letterSpacing: -5
  },
  notes: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1
  },
  chunk: {
    position: "absolute",
    top: 0,
    right: 200,
    zIndex: 2,
    elevation: 10
  },
  outerChunk: {
    position: "absolute",
    top: 0,
    left: 0,
    color: "white",
    fontSize: 96,
    fontFamily: "Poppins-Black",
    letterSpacing: -5,
    zIndex: 3
  },
  innerChunk: {
    position: "absolute",
    zIndex: 4,
    top: 14,
    left: 3,
    color: "#2962FF",
    fontSize: 84,
    fontFamily: "Poppins-Bold",
    letterSpacing: -5
  }
});

export default Chunk;
