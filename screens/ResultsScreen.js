import {useContext} from "react";
import ResultsContext from "../contexts/ResultsContext";
import ExcellentScreen from "./results/ExcellentScreen";
import GoodScreen from "./results/GoodScreen";
import NiceTryScreen from "./results/NiceTryScreen";
import Constants from "../shared/Constants";

const ResultsScreen = () => {
  const {results} = useContext(ResultsContext);
  const sentenceScore = results.sentence_score;
  if (sentenceScore >= Constants.GOOD_THRESHOLD) {
    return <ExcellentScreen />;
  } else if (sentenceScore >= Constants.MEDIOCRE_THRESHOLD) {
    return <GoodScreen />;
  } else {
    return <NiceTryScreen />;
  }
};

export default ResultsScreen;
