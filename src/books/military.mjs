import { parseObject, BlueprintBook } from '../objects.mjs';
import patching from '../util/patching.mjs';
import strings from '../util/strings.mjs';

import printObject from '../dev-utils/tree-object.mjs';

//
// Start Program
//

const blueprintBook = new BlueprintBook({
    blueprint_book: {
      item: "blueprint_book",
      label: "Military",
      icons: [
        { signal: { type: "item", name: "rail" }, index: 1 },
        { signal: { type: "item", name: "beacon" }, index: 2 },
        { signal: { type: "item", name: "explosive-rocket" }, index: 3 },
        { signal: { type: "item", name: "rocket" }, index: 4 }
      ],
      blueprints: [],
      active_index: 0,
      version: 281479275675648
    }
  })
  .addObject(parseObject("./blueprints/biters/wallmoeba-mini-ashy.txt").setContents(2, 3))
  .explode()
  .addObject("./blueprints/biters/wall-station-madkatz.txt")

  .addObject("./blueprints/biters/wallmoeba-segment.txt")
  .addObject("./blueprints/biters/wallmoeba-segment-no-lasers.txt")
  .addObject("./blueprints/biters/explosive-rockets-mskitty.txt")
  .addObject("./blueprints/biters/artillery-shells-mskitty.txt")
  .addObject("./blueprints/biters/war-rails-mskitty.txt")
  .explode()

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
