const refineText = (chunks, version) => {
  console.log("Raw Text: ", chunks.join(" "));
  switch (version) {
    case "1":
      const filteredChunks = chunks
        .filter(chunk => {
          return chunk.length <= 5;
        })
        .map(chunk => {
          return chunk.replace(/\s+/g, "");
        });
      return filteredChunks;
      break;
    case "2":
      return "Phonics Builder 2";
      break;
    case "3":
      return "Phonics Builder 3";
      break;
    default:
      return "N/A";
      break;
  }
};

export default refineText;
