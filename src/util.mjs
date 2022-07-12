import zlib from 'zlib';

// Accepts an object and returns a string
function encodeBlueprintString(object) {
  return '0' + zlib.deflateSync(JSON.stringify(object), { level: 9 }).toString('base64');
}

// Accepts a string and returns an object
function decodeBlueprintString(string) {
  return JSON.parse(zlib.inflateSync(Buffer.from(string.substr(1, string.length), 'base64')));
}

function standardizeStationNames(book) {
  return book
    .modifyAllStationNames(name => name.replace(/\[\/?color(\=((\d{1,3},\d{1,3},\d{1,3})|(\w+)))?\]/g, "")) // Remove colors
    .modifyAllStationNames(name => name.replace(/(\s\*)+$/g, "")) // Remove stars
    .modifyAllStationNames(name => name.replace(/3\-8/g, "")) // Remove 3-8 indicators
    .modifyAllStationNames(name => name.replace(/\[img=(item|fluid).([\w\-]+)\]/g, "[$1=$2]")) // Fix [img=item/fluid.name] with [item/fluid=name]
    .modifyAllStationNames(name => (name == "" || name == "[U]") ? "☭ Communism" : name) // Replace unnamed stations with Communism
    .modifyAllStationNames(name => name.trim()); // Trim all station names
}

export default {
  standardizeStationNames,
  encodeBlueprintString,
  decodeBlueprintString
}
