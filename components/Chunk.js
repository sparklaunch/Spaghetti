import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import Sound from "react-native-sound";
import Constants from "../shared/Constants";

Sound.setCategory("Playback");

const Chunk = ({chunk}) => {
  const [visibleChunk, setVisibleChunk] = useState(chunk);
  const springAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const biggerAnimation = useRef(new Animated.Value(1)).current;
  const chunkFadeAnimation = useRef(new Animated.Value(0)).current;
  const chunkMoveAnimation = useRef(new Animated.Value(0)).current;
  const chunkMovementAnimation = Animated.spring(chunkMoveAnimation, {
    toValue: 100,
    useNativeDriver: true,
    friction: 100,
    tension: 100
  });
  const chunkFadeInAnimation = Animated.timing(chunkFadeAnimation, {
    toValue: 1,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
    duration: 300
  });
  const chunkFadeOutAnimation = Animated.timing(chunkFadeAnimation, {
    toValue: 0,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
    duration: 300
  });
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
  const fadeInAnimation = Animated.timing(fadeAnimation, {
    toValue: 1,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
    duration: 300
  });
  const fadeOutAnimation = Animated.timing(fadeAnimation, {
    toValue: 0,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
    duration: 300
  });
  const gettingBiggerAnimation = Animated.timing(biggerAnimation, {
    toValue: 2,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
    duration: 600
  });
  const showSpring = () => {
    showSpringAnimation.start();
  };
  const showFadeInAndOut = () => {
    Animated.sequence([fadeInAnimation, fadeOutAnimation]).start();
  };
  const showGettingBigger = () => {
    gettingBiggerAnimation.start();
  };
  const showChunkFadeInOut = () => {
    Animated.sequence([chunkFadeInAnimation, chunkFadeOutAnimation]).start();
  };
  const showChunkMovement = () => {
    chunkMovementAnimation.start();
  };
  const bounce = () => {
    Animated.sequence([bounceAnimation, debounceAnimation]).start();
  };
  const onTapChunk = () => {
    bounce();
    let chunkName;
    switch (chunk) {
      case "oo(uu)":
        chunkName = "oo_tense_u";
        break;
      case "oo(u)":
        chunkName = "oo_lax_u";
        break;
      case "ow(au)":
        chunkName = "ow_au";
        break;
      case "ow(ou)":
        chunkName = "ow_ou";
        break;
      default:
        chunkName = chunk;
        break;
    }
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
  useEffect(() => {
    showSpring();
    showFadeInAndOut();
    showGettingBigger();
    showChunkFadeInOut();
    showChunkMovement();
  }, []);
  useLayoutEffect(() => {
    switch (chunk) {
      case "oo(uu)":
        setVisibleChunk("oo");
        break;
      case "oo(u)":
        setVisibleChunk("oo");
        break;
      case "ow(au)":
        setVisibleChunk("ow");
        break;
      case "ow(ou)":
        setVisibleChunk("ow");
        break;
      default:
        setVisibleChunk(chunk);
        break;
    }
  }, []);
  return (
    <View style={styles.block}>
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
          <Text style={styles.text}>{visibleChunk}</Text>
        </Pressable>
      </Animated.View>
      <Animated.View
        style={[
          styles.notes,
          {
            opacity: fadeAnimation,
            transform: [
              {
                scale: biggerAnimation
              }
            ]
          }
        ]}>
        <Image source={require("../assets/images/notes.png")} />
      </Animated.View>
      <Animated.View
        style={[
          styles.chunk,
          {
            opacity: chunkFadeAnimation,
            transform: [
              {
                rotateZ: "-15deg"
              },
              {
                translateX: chunkMoveAnimation
              }
            ]
          }
        ]}>
        <Text style={styles.outerChunk}>{visibleChunk}</Text>
        <Text style={styles.innerChunk}>{visibleChunk}</Text>
      </Animated.View>
    </View>
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
