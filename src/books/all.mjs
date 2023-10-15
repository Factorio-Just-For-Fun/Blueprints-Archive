import { parseObject, BlueprintBook } from '../objects.mjs';
import path from 'path';
import fs from 'fs/promises';


//
// CONFIG
//
const sourceDir = "./blueprints";
const directoryPrefix = "./";
const prioritizeDirectories = true;

// Space = root dir
async function loadDirectory(relativePath) {
  const output = [];

  for (let file of await fs.readdir(path.join(sourceDir, relativePath), { withFileTypes: true })) {
    if (file.isDirectory()) {
      // Make a new book
      const blueprintBook = new BlueprintBook({
        blueprint_book: {
          item: "blueprint_book",
          label: directoryPrefix + file.name,
          blueprints: []
        }
      });

      // Fill it, etc
      blueprintBook.blueprints = await loadDirectory(path.join(relativePath, file.name));
      output.push(blueprintBook);
    } else {
      // Name the bp the file name if none exists
      const blueprint = parseObject(path.join(sourceDir, relativePath, file.name));
      if (!blueprint.label) blueprint.label = "./" + file.name;
      else blueprint.label = "./" + file.name + " - " + blueprint.label;

      output.push(blueprint);
    }
  }

  // Sort alphabetically
  return output.sort((a, b) => {
    if (prioritizeDirectories) {
      if ((a instanceof BlueprintBook) && !(b instanceof BlueprintBook)) return -1;
      else if (!(a instanceof BlueprintBook) && (b instanceof BlueprintBook)) return 1;
    }

    return a.label.localeCompare(b.label);
  });
}

//
// Start Program
//

const blueprintBook = new BlueprintBook({
  blueprint_book: {
    item: "blueprint_book",
    label: "[Ashy] All Blueprints!",
    icons: [
      { signal: { type: "virtual", name: "signal-A" }, index: 1 },
      { signal: { type: "virtual", name: "signal-S" }, index: 2 },
      { signal: { type: "virtual", name: "signal-H" }, index: 3 },
      { signal: { type: "virtual", name: "signal-Y" }, index: 4 }
    ],
    description: "All blueprints in the repository. Compiled by Ashy314, though not vetted for quality. Do not post in game blueprints." + (process.env.GITHUB_SHA ? '\nCommit: #' + process.env.GITHUB_SHA.substring(0, 7) : ''),
    blueprints: [],
    active_index: 0,
    version: 281479275675648
  }
});

blueprintBook.setContents(...await loadDirectory(""));

export default blueprintBook;
