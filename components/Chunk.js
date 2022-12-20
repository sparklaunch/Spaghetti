import {Pressable, StyleSheet, Text, View} from "react-native";
import {useLayoutEffect, useState} from "react";
import Sound from "react-native-sound";
import Constants from "../shared/Constants";
import phonemeToSignifierMapper from "../utils/phonemeToSignifierMapper";
import phonemeToOrthographyMapper from "../utils/phonemeToOrthographyMapper";
import Animated, {BounceIn, BounceOut, Layout} from "react-native-reanimated";

Sound.setCategory("Playback");

const Chunk = ({chunk}) => {
  const [visibleChunk, setVisibleChunk] = useState(chunk);
  const onTapChunk = () => {
    const chunkName = phonemeToSignifierMapper(chunk);
    const sound = new Sound(`${chunkName}.mp3`, Sound.MAIN_BUNDLE, error => {
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
      style={styles.block}
      entering={BounceIn}
      exiting={BounceOut}
      layout={Layout.duration(200)}>
      <View style={styles.block}>
        <Pressable onPress={onTapChunk}>
          <Text style={styles.text}>{visibleChunk}</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontFamily: "Poppins-Bold",
    fontSize: 128,
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
