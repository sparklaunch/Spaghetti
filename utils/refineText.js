const refineText = chunks => {
  console.log("Raw Text: ", chunks);
  const eFutureIndex = chunks.indexOf(chunk => {
    return chunk.includes("future");
  });
  const slicedChunks = chunks.slice(0, eFutureIndex - 1);
  return slicedChunks[0];
};

export default refineText;
