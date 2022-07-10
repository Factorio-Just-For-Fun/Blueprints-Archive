import zlib from 'zlib';

// Accepts an object and returns a string
function encodeBlueprintString(object) {
  return '0' + zlib.deflateSync(JSON.stringify(object), { level: 9 }).toString('base64');
}

// Accepts a string and returns an object
function decodeBlueprintString(string) {
  return JSON.parse(zlib.inflateSync(Buffer.from(string.substr(1, string.length), 'base64')));
}

export default {
  encodeBlueprintString, decodeBlueprintString
}
