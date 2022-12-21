import useErrorHandler from "./useErrorHandler";

const useLoadModel = () => {
  const errorHandler = useErrorHandler();
  return tensorflowLite => {
    tensorflowLite.loadModel(
      {
        model: "model.tflite",
        labels: "labels.txt"
      },
      (error, _) => {
        if (error) {
          errorHandler("LOAD_MODEL_ERROR", error);
        }
      }
    );
    return tensorflowLite;
  };
};

export default useLoadModel;
