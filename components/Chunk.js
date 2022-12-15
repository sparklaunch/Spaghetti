import {Animated, Easing, Pressable, StyleSheet, Text} from "react-native";
import {useEffect, useRef} from "react";
import Sound from "react-native-sound";
import Constants from "../shared/Constants";

Sound.setCategory("Playback");

const Chunk = ({chunk}) => {
  const springAnimation = useRef(new Animated.Value(0)).current;
  const showSpringAnimation = Animated.spring(springAnimation, {
    toValue: 1,
    bounciness: 10,
    speed: 1,
    useNativeDriver: true
  });
  const bounceAnimation = Animated.timing(springAnimation, {
    toValue: 1.5,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
    duration: 300
  });
  const debounceAnimation = Animated.timing(springAnimation, {
    toValue: 1,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
    duration: 300
  });
  const showSpring = () => {
    showSpringAnimation.start();
  };
  const bounce = () => {
    Animated.sequence([bounceAnimation, debounceAnimation]).start();
  };
  const onTapChunk = () => {
    bounce();
    const sound = new Sound(`${chunk}.mp3`, Sound.MAIN_BUNDLE, error => {
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
        <Text
          style={[
            styles.text,
            chunk.length >= 2 && {
              fontSize: 96
            }
          ]}>
          {chunk}
        </Text>
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
    color: Constants.PRIMARY_COLOR
  }
});

export default Chunk;
