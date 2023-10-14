import { parseObject } from '../objects.mjs';
import patching from '../util/patching.mjs';
import strings from '../util/strings.mjs';

import printObject from '../dev-utils/tree-object.mjs';

//
// Start Program
//

const blueprintBook = parseObject("./blueprints/power/solar-mskitty.txt")
.setContents("Solar 87% Ratio mskitty", "1-1 Solar Load mskitty", "Solar Drop mskitty")
.explode()
.addObject("./blueprints/malls/solar/solar-mskitty.txt")
.addObject("./blueprints/malls/solar/accumulator-mskitty.txt")

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
