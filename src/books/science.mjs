import { BlueprintBook } from '../objects.mjs';
import patching from '../util/patching.mjs';
import strings from '../util/strings.mjs';

import printObject from '../dev-utils/tree-object.mjs';

//
// Start Program
//

const blueprintBook = new BlueprintBook({
  blueprint_book: {
    item: "blueprint_book",
    label: "Science EXPENSIVE mskitty",
    icons: [
      { signal: { type: "item", name: "automation-science-pack" }, index: 1 }
    ],
    blueprints: [],
    active_index: 0,
    version: 281479275675648
  }
}).setContents(
  "./blueprints/belt/science/red-1kmin-expensive-mskitty.txt",
  "./blueprints/belt/science/green-1kmin-expensive-mskitty.txt",
  "./blueprints/belt/science/blue-1kmin-expensive-mskitty.txt",
  "./blueprints/belt/science/gray-1kmin-expensive-mskitty.txt",
  "./blueprints/belt/science/purple-1kmin-red-expensive-mskitty.txt",
  "./blueprints/belt/science/yellow-1kmin-expensive-mskitty.txt",
  "./blueprints/belt/science/space-1kmin-expensive-mskitty.txt",
  "./blueprints/belt/intermediates/low-density-structure-fixed-337-expensive-mskitty.txt",
  "./blueprints/belt/intermediates/rcu-744-fixed-expensive-mskitty.txt",
  "./blueprints/belt/fluids/rocket-fuel-740m-fixed-expensive-mskitty.txt"
);

patching.standardizeStationNames(blueprintBook);

if (process.env.CI) { // Add new version tags
  blueprintBook.modifyAllDescriptions(description => `${ description ? description + "\n\n" : "" }${ new Date().toISOString().split("T")[0] } FJFF Blueprints compiled by Ashy314.\nhttps://discord.gg/ehHEDDnPWA`);
}

// Copy to clipboard if called directly
import { fileURLToPath } from "url";
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  const clipboard = (await import("clipboardy")).default;

  clipboard.writeSync(strings.encode(blueprintBook.toObject()));
  await printObject(blueprintBook);
}

export default blueprintBook;
