function standardizeStationNames(book) {
  return book
    .modifyAllStationNames(name => name.replace(/\[\/?color(\=((\d{1,3},\d{1,3},\d{1,3})|(\w+)))?\]/g, "")) // Remove colors
    .modifyAllStationNames(name => name.replace(/(\s\*)+$/g, "")) // Remove stars
    .modifyAllStationNames(name => name.replace(/3\-8/g, "")) // Remove 3-8 indicators
    .modifyAllStationNames(name => name.replace(/\[img=(item|fluid).([\w\-]+)\]/g, "[$1=$2]")) // Fix [img=item/fluid.name] with [item/fluid=name]
    .modifyAllStationNames(name => name.replace(/^\[(U|L)\]\s\[/, "[$1][")) // Remove space between [U/L] and a tag
    .modifyAllStationNames(name => name.replace(/^\[(U|L)\](\w)/, "[$1] $2")) // Add space between [U/L] and a word
    .modifyAllStationNames(name => name.replace("[U][virtual-signal=signal-red] Trash", "[U][virtual-signal=signal-red]Trash")) // Fix trash trains
    .modifyAllStationNames(name => name.replace(/\s+/, ' ')) // Replace multiple spaces with 1
    .modifyAllStationNames(name => (name == "" || name == "[U]") ? "☭ Communism" : name) // Replace unnamed stations with Communism
    .modifyAllStationNames(name => name.trim()); // Trim all station names
}

export default {
  standardizeStationNames
}

//
// Run Program
//
import { fileURLToPath } from "url";
import clipboard from 'clipboardy';
import strings from './strings.mjs';
import { parseObject } from '../objects.mjs';

if (process.argv[1] == fileURLToPath(import.meta.url)) {
  const blueprint = parseObject(strings.decode(clipboard.readSync()));
  clipboard.writeSync(strings.encode(standardizeStationNames(blueprint).toObject()));
}
