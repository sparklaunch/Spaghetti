const refineText = chunks => {
  console.log("Raw Text: ", chunks.join(" "));
  const filteredChunks = chunks.filter(chunk => {
    return chunk.length <= 3;
  });
  if (filteredChunks.length === 1 || filteredChunks.length === 3) {
    return filteredChunks;
  } else {
    return "N/A";
  }
};

export default refineText;
