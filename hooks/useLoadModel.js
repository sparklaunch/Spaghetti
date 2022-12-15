import useErrorHandler from "./useErrorHandler";

const useLoadModel = () => {
  const errorHandler = useErrorHandler();
  return tflite => {
    tflite.loadModel(
      {
        model: "model_unquant.tflite",
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
