import strings from './util/strings.mjs';

import fs from "fs/promises";
import path from "path";

import { Argument, Option, program } from 'commander';
import patching from './util/patching.mjs';

//
// CONFIG
//

const bookDir = "./src/books";
const allBooks = await fs.readdir(bookDir);

program
  .name('blueprints')
  .description('Utilities revolving factorio blueprint books')
  .version('0.0.1')
  .option('-o, --output [folder]', 'output directory', './out')
  .option('-c, --copy', 'copy the blueprint to clipboard')
  .option('-t, --tag', 'tag with the date')
  .option('-s, --silent', 'operate silently')
  .addOption(new Option('-a, --all', 'build all books'))
  .addArgument(new Argument('[books...]', 'specify books').choices(allBooks).default([ "starter.mjs" ]))
  .action(run);

program.parse();

//
// PROGRAM
//
async function run(books, options) {
  await fs.mkdir(options.output, { recursive: true });

  if (options.all) books = allBooks;

  for (let file of books) {
    // Load the blueprint and standardize
    if (!options.silent) console.log("Loading book " +  file);
    let blueprint = (await import("../" + path.join(bookDir, file))).default;

    // Remove old tags
    blueprint = blueprint.modifyAllDescriptions(description => description ? description : "") // Add description if none
      .modifyAllDescriptions(description => { // Remove old version tags
        let newDescription = description.replace(/\d{4}-\d{2}-\d{2} FJFF Common Blueprints compiled by i_cant.\nhttps:\/\/discord\.gg\/ehHEDDnPWA/g, "");
        if (newDescription != description) console.warn("Blueprint contained outdated tag: " + newDescription);

        return newDescription;
      })
      .modifyAllDescriptions(description => description.replace(/\n{3,}/g, "\n\n").trim()); // 3+ newlines -> 2
    
    // Add tags
    if (options.tag) {
      if (!options.silent) console.log("Tagging prints...")
      blueprint = blueprint.modifyAllDescriptions(description => `${ description ? description + "\n\n" : "" }${ new Date().toISOString().split("T")[0] } FJFF Blueprints compiled by Ashy314.\nhttps://discord.gg/ehHEDDnPWA`);
    }

    // Fix station names
    if (!options.silent) console.log("Fixing station names...")
    patching.standardizeStationNames(blueprint);

    // Encode and save
    if (!options.silent) console.log("Modifying descriptions.")
    const string = strings.encode(blueprint.toObject());

    if (!options.silent) console.log("Saving.")
    await fs.writeFile(path.join(options.output, path.basename(file).replace(/\.mjs$/g, '.txt')), string, "utf-8");

    if (options.copy) {
      const clipboard = (await import("clipboardy")).default;
      clipboard.writeSync(string);
      if (!options.silent) console.log("Copied to clipboard.")
    }
  }
}