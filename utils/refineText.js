const refineText = chunks => {
  let modifiedChunks = chunks.join("").replace(/\s/g, "").toLowerCase();
  console.log("Raw Text: ", modifiedChunks);

  if (modifiedChunks.includes("future")) {
    modifiedChunks = modifiedChunks.split("future")[0];
  }

  if (modifiedChunks.includes("@")) {
    modifiedChunks = modifiedChunks.split("@")[0];
  }

  modifiedChunks = modifiedChunks.replace(/[^a-zA-Z]/g, "");

  const middleChunks = [
    "ee",
    "ea",
    "oa",
    "ow",
    "ai",
    "ay",
    "oi",
    "oy",
    "ou",
    "ir",
    "er",
    "ur",
    "ar",
    "or",
    "oo",
    "a",
    "e",
    "i",
    "o",
    "u"
  ];
  let result = [];
  for (const middleChunk of middleChunks) {
    if (modifiedChunks.includes(middleChunk)) {
      const [first, third] = modifiedChunks.split(middleChunk);
      result = [first, middleChunk, third];
    }
  }
  console.log("Final Result: ", result);
  return result;
};

export default refineText;
