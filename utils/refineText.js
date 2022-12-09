const refineText = chunks => {
  console.log("Raw Text: ", chunks);
  const eFutureIndex = chunks.indexOf(chunk => {
    return chunk.includes("future");
  });
  const slicedChunks = chunks
    .slice(0, eFutureIndex - 1)
    .map(chunk => chunk.toLowerCase());
  console.log("Phase: ", slicedChunks);
  if (slicedChunks.length === 1) {
    const splitChunks = slicedChunks[0].split(" ");
    return splitChunks;
  } else if (slicedChunks.length === 2) {
    return slicedChunks.join(" ").split(" ");
  } else {
    return slicedChunks;
  }
};

export default refineText;
