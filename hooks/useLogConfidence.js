const useLogConfidence = () => {
  return candidates => {
    const confidences = candidates.map(candidate => {
      return `[Confidence: ${candidate.confidence.toFixed(2)}]: ${
        candidate.label
      }`;
    });
    console.log(confidences.join(", "));
  };
};

export default useLogConfidence;
