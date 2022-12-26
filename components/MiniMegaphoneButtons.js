import {StyleSheet, View} from "react-native";
import MiniMegaphoneButton from "./MiniMegaphoneButton";
import {useContext} from "react";
import ChunksContext from "../contexts/ChunksContext";

const MiniMegaphoneButtons = () => {
  const {chunks} = useContext(ChunksContext);
  return (
    <View style={styles.container}>
      <MiniMegaphoneButton order={"first"} />
      <MiniMegaphoneButton order={"last"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default MiniMegaphoneButtons;
