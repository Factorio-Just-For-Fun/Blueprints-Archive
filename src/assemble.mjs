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
if (program.env.CI) {
  for (let file of ciBooks) {
    // Load the blueprint and standardize
    const blueprint = (await import("./" + path.join(bookDir, file))).default
      .modifyAllDescriptions(description => description ? description : "")
      .modifyAllDescriptions(description => description.replace(/\d{4}-\d{2}-\d{2} FJFF Common Blueprints compiled by i_cant.\nhttps:\/\/discord\.gg\/ehHEDDnPWA/g, "").trim()) // Remove old version tags
      .modifyAllDescriptions(description => description.replace(/\n{3,}/g, "\n\n")); // 3+ newlines -> 2
    // Export to string, set copy var, save
    const string = strings.encode(blueprint.toObject());
    await fs.writeFile(path.join(outputDir, file.replace(/\.mjs$/g, '.txt')), string, "utf-8");
  }

} else {
  let copyString = "";
  for (let file of await fs.readdir(path.join("src", bookDir))) {
    // Load the blueprint and standardize
    const blueprint = (await import("./" + path.join(bookDir, file))).default
      .modifyAllDescriptions(description => description ? description : "")
      .modifyAllDescriptions(description => description.replace(/\d{4}-\d{2}-\d{2} FJFF DEVELOPMENT Blueprints compiled by i_cant.\nhttps:\/\/discord\.gg\/ehHEDDnPWA/g, "").trim()) // Remove old version tags
      .modifyAllDescriptions(description => description.replace(/\n{3,}/g, "\n\n")); // 3+ newlines -> 2
    // Export to string, set copy var, save
    const string = strings.encode(blueprint.toObject());

    if (!process.env.CI && file == copyBook) copyString = string;
    await fs.writeFile(path.join(outputDir, file.replace(/\.mjs$/g, '.txt')), string, "utf-8");
  }

  if (copyString) {
    const clipboard = (await import("clipboardy")).default;
    clipboard.writeSync(copyString);
  }
}
