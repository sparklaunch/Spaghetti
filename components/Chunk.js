import {Animated, Pressable, StyleSheet, Text} from "react-native";
import {useEffect, useRef} from "react";
import Sound from "react-native-sound";
import logError from "../utils/logError";

Sound.setCategory("Playback");

const Chunk = ({chunk}) => {
  const springAnimation = useRef(new Animated.Value(0)).current;
  const showSpring = () => {
    Animated.spring(springAnimation, {
      toValue: 1,
      bounciness: 10,
      speed: 1,
      useNativeDriver: true
    }).start();
  };
  const onTapChunk = () => {
    const sound = new Sound(`${chunk}.mp3`, Sound.MAIN_BUNDLE, error => {
      if (error) {
        logError("PLAY_SOUND_ERROR", error);
      } else {
        sound.play(success => {
          if (success) {
            sound.release();
          } else {
            logError("AUDIO_DECODING_ERROR");
          }
        });
      }
    });
  };
  useEffect(() => {
    showSpring();
  }, []);
  return (
    <Animated.View
      style={[
        styles.block,
        {
          transform: [
            {
              scale: springAnimation
            }
          ]
        }
      ]}>
      <Pressable onPress={onTapChunk}>
        <Text style={styles.text}>{chunk}</Text>
      </Pressable>
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
    color: "black"
  }
});

export default Chunk;
