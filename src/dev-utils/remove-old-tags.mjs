import clipboard from 'clipboardy';
import strings from '../util/strings.mjs';
import { parseObject } from '../objects.mjs';

//
// Run Program
//
import { fileURLToPath } from "url";

if (process.argv[1] == fileURLToPath(import.meta.url)) {
  let blueprint = parseObject(strings.decode(clipboard.readSync()));
  blueprint = blueprint.modifyAllDescriptions(description => description ? description : "")
    .modifyAllDescriptions(description => description.replace(/\d{4}-\d{2}-\d{2} FJFF Common Blueprints compiled by i_cant.\nhttps:\/\/discord\.gg\/ehHEDDnPWA/g, "").trim()) // Remove old version tags
    .modifyAllDescriptions(description => description.replace(/\n{3,}/g, "\n\n")); // 3+ newlines -> 2

  clipboard.writeSync(strings.encode(blueprint.toObject()));
}
