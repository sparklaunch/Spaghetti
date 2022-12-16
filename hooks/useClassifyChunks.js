import useErrorHandler from "./useErrorHandler";
import useLogConfidence from "./useLogConfidence";

const useClassifyChunks = () => {
  const logConfidence = useLogConfidence();
  const errorHandler = useErrorHandler();
  return (tflite, paths, callback) => {
    console.log(
      "#-----------------------------------------------------------------#"
    );
    const results = [];
    tflite.runModelOnImage(
      {
        path: paths[0]
      },
      (error, candidates) => {
        if (error) {
          errorHandler("CLASSIFY_CHUNKS_ERROR", error);
        } else {
          logConfidence(candidates);
          results.push(candidates[0].label);
          tflite.runModelOnImage(
            {
              path: paths[1]
            },
            (error, candidates) => {
              if (error) {
                errorHandler("CLASSIFY_CHUNKS_ERROR", error);
              } else {
                logConfidence(candidates);
                results.push(candidates[0].label);
                tflite.runModelOnImage(
                  {
                    path: paths[2]
                  },
                  (error, candidates) => {
                    if (error) {
                      errorHandler("CLASSIFY_CHUNKS_ERROR", error);
                    } else {
                      logConfidence(candidates);
                      results.push(candidates[0].label);
                      callback(results);
                    }
                    tflite.close();
                  }
                );
              }
            }
          );
        }
      }
    );
  };
};

export default useClassifyChunks;
