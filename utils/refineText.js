const refineText = chunks => {
  // Initial phase.
  const rawText = chunks.join("");
  console.log("Raw Text: ", rawText);

  // Phase 1: Get the actual chunk before "future".
  const phase1 = rawText.split("future")[0];
  console.log("Phase 1: ", phase1);

  // Phase 2: Get the actual chunk before "Show", only if it has one.
  let phase2;
  if (phase1.includes("Show")) {
    phase2 = phase1.split("Show")[0];
  } else {
    phase2 = phase1;
  }
  console.log("Phase 2: ", phase2);

  // Phase 3: Lower the case.
  const phase3 = phase2.toLowerCase();
  console.log("Phase 3: ", phase3);

  // Phase 4: Split the chunks by the possible middle chunks.
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
  let phase4;
  for (const middleChunk of middleChunks) {
    if (phase3.includes(middleChunk)) {
      const [first, third] = phase3.split(middleChunk);
      phase4 = [first, middleChunk, third];
    }
  }
  console.log("Phase 4: ", phase4);

  // Phase 5: Trim the chunks.
  const phase5 = phase4.map(chunk => chunk.trim());
  console.log("Phase 5: ", phase5);

  // Phase 6: Replace "9" with "g". Replace "" with "l". Replace "0" with "o".
  const phase6 = phase5.map(chunk => {
    if (chunk === "9") {
      return "g";
    } else if (chunk === "") {
      return "l";
    } else if (chunk === "0") {
      return "o";
    } else if (chunk === "bb" || chunk === "b b") {
      return "b";
    } else {
      return chunk;
    }
  });
  console.log("Phase 6: ", phase6);

  // Phase 7: Remove all vowel occurrences in the first and third chunk.
  const first = phase6[0].replace(/[aeiou]/, "");
  const third = phase6[2].replace(/[aeiou]/, "");
  const phase7 = [first, phase6[1], third];
  console.log("Phase 7: ", phase7);

  return "N/A";
};

export default refineText;
