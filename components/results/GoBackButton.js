import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {useContext} from "react";
import ResultsStatusContext from "../../contexts/ResultsStatusContext";
import usePlaySound from "../../hooks/usePlaySound";

const GoBackButton = () => {
  const {setResultsScreenShown} = useContext(ResultsStatusContext);
  const playSound = usePlaySound();
  const goBack = () => {
    playSound("click", () => {
      setResultsScreenShown(false);
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.backButton}
      onPress={goBack}>
      <Image source={require("../../assets/images/back.png")} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "relative",
    top: 10,
    left: 120,
    width: 43,
    height: 46
  }
});

export default GoBackButton;
