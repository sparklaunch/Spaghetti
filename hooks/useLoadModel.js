import useErrorHandler from "./useErrorHandler";

const useLoadModel = () => {
  const errorHandler = useErrorHandler();
  return tflite => {
    tflite.loadModel(
      {
        model: "model64.tflite",
        labels: "labels.txt"
      },
      (error, _) => {
        if (error) {
          errorHandler("LOAD_MODEL_ERROR", error);
        }
      }
    );
    return tflite;
  };
};

export default useLoadModel;
