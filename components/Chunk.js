import {Animated, StyleSheet, Text} from "react-native";
import {useEffect, useRef} from "react";

const Chunk = ({chunk}) => {
  const springAnimation = useRef(new Animated.Value(0)).current;
  const spring = () => {
    Animated.spring(springAnimation, {
      toValue: 1,
      bounciness: 10,
      speed: 1,
      useNativeDriver: true
    }).start();
  };
  useEffect(() => {
    spring();
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
      <Text style={styles.text}>{chunk}</Text>
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
