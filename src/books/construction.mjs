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
    label: "Construction Outpost [item=locomotive] [item=assembling-machine-3]",
    icons: [
      { signal: { type: "item", name: "locomotive" }, index: 1 },
      { signal: { type: "item", name: "deconstruction-planner" }, index: 2 }
    ],
    blueprints: [],
    active_index: 0,
    version: 281479275675648
  }
})
.addObject("./blueprints/rail-misc/construction-load-spzi.txt")
.addObject("./blueprints/rail-misc/construction-unload-spzi.txt")
.addObject("./blueprints/rail-misc/mine-builder.txt")
.addObject("./blueprints/rail-misc/trash-train.txt")
.addObject("./blueprints/rail-misc/trash-unload.txt")
.addObject("./blueprints/rail-misc/construction-unload-spzi.txt")
.addObject("./blueprints/rail-misc/module-load.txt")
.addObject("./blueprints/rail-misc/module-unload.txt")
.addObject("./blueprints/rail-misc/module-unload-t1.txt")
.addObject("./blueprints/rail-misc/reactor-load.txt")
.addObject("./blueprints/rail-misc/reactor-unload.txt")

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
