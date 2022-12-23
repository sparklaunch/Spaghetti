import {useContext} from "react";
import ResultsContext from "../contexts/ResultsContext";
import ExcellentScreen from "./results/ExcellentScreen";
import GoodScreen from "./results/GoodScreen";
import NiceTryScreen from "./results/NiceTryScreen";

const ResultsScreen = () => {
  const {results} = useContext(ResultsContext);
  const sentenceScore = results.sentence_score;
  if (sentenceScore >= 80) {
    return <ExcellentScreen />;
  } else if (sentenceScore >= 60) {
    return <GoodScreen />;
  } else {
    return <NiceTryScreen />;
  }
};

export default ResultsScreen;
