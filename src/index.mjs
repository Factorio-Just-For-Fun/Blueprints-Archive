import strings from './util/strings.mjs';

import fs from "fs/promises";
import path from "path";

import { Option, program } from 'commander';
import patch from './util/patching.mjs';

//
// CONFIG
//

const bookDir = "./src/books";
const allBooks = await fs.readdir(bookDir);

program
  .name('blueprints')
  .description('Utilities revolving factorio blueprint books')
  .version('0.0.2')

  // Regular options
  .option('-o, --output [file]', 'output file', 'out.txt')
  .option('-c, --copy', 'copy the blueprint to clipboard')
  .option('-t, --tag', 'tag with the date')
  .option('-s, --silent', 'operate silently')

  // Configuration options
  .option('-n, --normal', 'include normal recipes')
  .option('-e, --expensive', 'include expensive recipes')
  .option('-trains <locomotives-wagons...>', 'train configuration')

  // Shorthand
  .addOption(new Option('--fjff').implies( { tag: true, expensive: true, trains: ['3-8'] }))
  .addOption(new Option('--personal').implies( { normal: true, expensive: true, trains: ['1-4', '2-4', '3-8'] }))
  .addArgument('<book>')
  .action(run);

program.parse();

//
// PROGRAM
//
async function run(book, options) {

  // Load the blueprint and standardize
  if (!options.silent) console.log("Loading book " +  book);
  let blueprint = (await import("../" + path.join(bookDir, book + ".mjs"))).default;

  // Handle patching
  blueprint = patch(await blueprint(options))
  
  // Add tags
  if (options.tag) {
    if (!options.silent) console.log("Tagging prints...")
    blueprint = blueprint.modifyAllDescriptions(description => `${ description ? description + "\n\n" : "" }${ new Date().toISOString().split("T")[0] } FJFF Blueprints compiled by Ashy314.\nhttps://discord.gg/ehHEDDnPWA`);
  }

  // Encode and save
  const string = strings.encode(blueprint.toObject());

  if (options.output) {
    if (!options.silent) console.log("Saving.")
    await fs.writeFile(options.output, string, "utf-8");
  }

  if (options.copy) {
    const clipboard = (await import("clipboardy")).default;
    clipboard.writeSync(string);
    if (!options.silent) console.log("Copied to clipboard.")
  }
  
}