import TextRecognition from "react-native-text-recognition";
import useErrorHandler from "./useErrorHandler";
import refineChunk from "../utils/refineChunk";

const useRecognizeChunks = () => {
  const errorHandler = useErrorHandler();
  return async imagePaths => {
    try {
      const firstResult = await TextRecognition.recognize(imagePaths[0]);
      const secondResult = await TextRecognition.recognize(imagePaths[1]);
      const thirdResult = await TextRecognition.recognize(imagePaths[2]);
      return [
        firstResult.map(refineChunk).join(""),
        secondResult.map(refineChunk).join(""),
        thirdResult.map(refineChunk).join("")
      ];
    } catch (error) {
      errorHandler("RECOGNIZE_CHUNKS_ERROR", error);
    }
  };
};

export default useRecognizeChunks;
