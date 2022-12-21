import useLogConfidence from "./useLogConfidence";

const useClassifyChunk = () => {
  const logConfidence = useLogConfidence();
  return (tflite, path) => {
    return new Promise((resolve, reject) => {
      console.log(
        "#-----------------------------------------------------------------#"
      );
      tflite.runModelOnImage(
        {
          path
        },
        (error, candidates) => {
          if (error) {
            reject(error);
          } else {
            logConfidence(candidates);
            resolve(candidates[0].label);
          }
        }
      );
    });
  };
};

export default useClassifyChunk;
