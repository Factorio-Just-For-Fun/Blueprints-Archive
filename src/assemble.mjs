import strings from './util/strings.mjs';

import fs from "fs/promises";
import path from "path";

//
// CONFIG
//

const copyBook = "starter.mjs";
const bookDir = "./books";
const outputDir = "./out";

const ciBooks = [ copyBook ];

//
// PROGRAM
//

await fs.mkdir(outputDir, { recursive: true });

// CI only does CI books, not all
if (process.env.CI) {
  for (let file of ciBooks) {
    await parseFile(path.join(bookDir, file));
  }
} else {
  let copyString = "";
  for (let file of await fs.readdir(path.join("src", bookDir))) {
    let string = await parseFile(path.join(bookDir, file));

    if (file == copyBook) copyString = string;
  }

  if (copyString) {
    const clipboard = (await import("clipboardy")).default;
    clipboard.writeSync(copyString);
  }
}

async function parseFile(fullPath) {
  // Load the blueprint and standardize
  console.log("Loading book " + fullPath);
  let blueprint = (await import("./" + fullPath)).default;

  console.log("Modifying descriptions.");
  blueprint = blueprint.modifyAllDescriptions(description => description ? description : "")
    .modifyAllDescriptions(description => description.replace(/\d{4}-\d{2}-\d{2} FJFF Common Blueprints compiled by i_cant.\nhttps:\/\/discord\.gg\/ehHEDDnPWA/g, "").trim()) // Remove old version tags
    .modifyAllDescriptions(description => description.replace(/\n{3,}/g, "\n\n")); // 3+ newlines -> 2

  // Export to string, set copy var, save
  console.log("Encoding book.");
  const string = strings.encode(blueprint.toObject());

  console.log("Saving.")
  await fs.writeFile(path.join(outputDir, path.basename(fullPath).replace(/\.mjs$/g, '.txt')), string, "utf-8");

  // Return the final string for copying if need be
  return string;
}
