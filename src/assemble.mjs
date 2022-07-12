import util from "./util.mjs";

import fs from "fs/promises";
import path from "path";

//
// CONFIG
//

const copyBook = "starter.mjs";
const bookDir = "./books";
const outputDir = "./out";

//
// PROGRAM
//

await fs.mkdir(outputDir, { recursive: true });

let copyString = "";
for (let file of await fs.readdir(path.join("src", bookDir))) {
  // Load the blueprint and standardize
  const blueprint = (await import("./" + path.join(bookDir, file))).default
    .modifyAllStationNames(name => name.replace(/\[\/?color(\=((\d{1,3},\d{1,3},\d{1,3})|(\w+)))?\]/g, "")) // Remove colors
    .modifyAllStationNames(name => name.replace(/(\s\*)+$/g, "")) // Remove stars
    .modifyAllStationNames(name => name.replace(/3\-8/g, "")) // Remove 3-8 indicators
    .modifyAllStationNames(name => name.replace(/\[img=(item|fluid).([\w\-]+)\]/g, "[$1=$2]")) // Fix [img=item/fluid.name] with [item/fluid=name]
    .modifyAllStationNames(name => (name == "" || name == "[U]") ? "☭ Communism" : name) // Replace unnamed stations with Communism
    .modifyAllStationNames(name => name.trim()) // Trim all station names

    .modifyAllDescriptions(description => description ? description : "")
    .modifyAllDescriptions(description => description.replace(/\d{4}-\d{2}-\d{2} FJFF Common Blueprints compiled by i_cant.\nhttps:\/\/discord\.gg\/ehHEDDnPWA/g, "").trim()) // Remove old version tags
    .modifyAllDescriptions(description => `${ description ? description + "\n\n" : "" }${ new Date().toISOString().split("T")[0] } FJFF Blueprints compiled by Ashy.\nhttps://discord.gg/ehHEDDnPWA`); // Add new version tags

  // Export to string, set copy var, save
  const string = await util.encodeBlueprintString(blueprint.toObject());

  if (!process.env.CI && file == copyBook) copyString = string;
  await fs.writeFile(path.join(outputDir, file.replace(/\.mjs$/g, '.txt')), string, "utf-8");
}

if (copyString) {
  const clipboard = (await import("clipboardy")).default;
  clipboard.writeSync(copyString);
}
