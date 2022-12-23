import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {useContext} from "react";
import ResultsStatusContext from "../../contexts/ResultsStatusContext";

const GoBackButton = () => {
  const {setResultsScreenShown} = useContext(ResultsStatusContext);
  const goBack = () => {
    setResultsScreenShown(false);
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
    position: "absolute",
    top: 15,
    left: 15
  }
});

export default GoBackButton;
