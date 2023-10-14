import { BlueprintBook } from '../objects.mjs';
import patching from '../util/patching.mjs';
import strings from '../util/strings.mjs';

import printObject from '../dev-utils/tree-object.mjs';

import mainbase from './mainbase.mjs';
import military from './military.mjs';
import outposts_unbeaconed from './outposts-unbeaconed.mjs';
import outposts from './outposts.mjs';
import rails from './rails.mjs';
import science from './science.mjs';
import solar from './solar.mjs';

//
// Start Program
//

function generateBaseBook() {
  return new BlueprintBook({
    blueprint_book: {
      item: "blueprint_book",
      label: "[FJFF] Starter",
      icons: [
        { signal: { type: "virtual", name: "signal-F" }, index: 1 },
        { signal: { type: "virtual", name: "signal-J" }, index: 2 },
        { signal: { type: "virtual", name: "signal-F" }, index: 3 },
        { signal: { type: "virtual", name: "signal-F" }, index: 4 }
      ],
      description: "Starter Game Blueprints for the Factorio Just For Fun Server. Compiled, scripted, and filtered by Ashy." + (process.env.GITHUB_SHA ? ' Commit: #' + process.env.GITHUB_SHA.substring(0, 7) : ''),
      blueprints: [],
      active_index: 0,
      version: 281479275675648
    }
  }).addObject("./blueprints/do-not-take-these-ash.txt")
    .addObject("./blueprints/do-not-take-these-ash.txt")
    .addObject("./blueprints/do-not-take-these-ash.txt")
    .addObject("./blueprints/do-not-take-these-ash.txt")
    .addObject("./blueprints/do-not-take-these-ash.txt")
    .addObject("./blueprints/do-not-take-these-ash.txt")
}

const blueprintBook = generateBaseBook()
  .addObject("./blueprints/balancers-raynquist.txt")
  .addObject(rails)
  .addObject("./blueprints/rail-misc/construction-compendium.txt")

  .addObject(outposts)
  .addObject(outposts_unbeaconed)
  .addObject(mainbase)

  .addObject(science)
  .addObject("./blueprints/belt/science-expensive.txt")
  .addObject(solar)
  .addObject(military)

  .addObject("./blueprints/power/uranium-processing-kerza.txt")
  .addObject("./blueprints/power/reactor-2.4gw-ferront.txt")
  .addObject("./blueprints/power/reactor-tileable-khornar.txt")
  .addObject("./blueprints/power/starter-216.txt")

  .addObject("./blueprints/rail-designs-3-8/mines/mines-jrz.txt")
  .addObject("./blueprints/rail-designs-3-8/mines/mine-uranium.txt")
  .addObject("./blueprints/module-upgrader-pixelcort.txt")
  .addObject("./blueprints/deconstruction-ash.txt")

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
