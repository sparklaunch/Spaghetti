const refineChunk = chunk => {
  chunk = chunk.toLowerCase();
  if (chunk.includes("0")) {
    chunk = chunk.replace(/0/g, "o");
  }
  if (chunk.includes("7")) {
    chunk = chunk.replace(/7/g, "z");
  }
  if (chunk.includes("9")) {
    chunk = chunk.replace(/9/g, "g");
  }
  if (chunk.includes("2")) {
    chunk = chunk.replace(/2/g, "z");
  }
  return chunk;
};

export default refineChunk;
