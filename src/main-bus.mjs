import clipboard from 'clipboardy';
import strings from './util/strings.mjs';

import { Blueprint } from './objects.mjs';

// Accepts an array of requests
// Assumes the type 'item' unless the format is 'type:name'
// Also accepts array for requests
function createMainBus(requests) {
  const object = new Blueprint({ blueprint: { version: 281479275675648, entities: [] }});
  for (let index in requests) {
    // Find request properties

    // Add combinator
    object.entities.push({
      entity_number: object.entities.length + 1,
      name: 'constant-combinator',
      position: { x: parseInt(index) + Math.floor(index / 4) * 2 + 0.5, y: 0.5}, // Add a spacing of 2 every 4 entries
      control_behavior: {
        filters: parseFilters(requests[index])
      }
    })
  }

  return object;
}

// Converts requests to combinator filters
function parseFilters(requests) {
  if (!Array.isArray(requests)) requests = [ requests ]
  return requests.map((it, index) => {
    let parts = it.split(":");
    return {
      signal: {
        name: parts.pop(),
        type: parts.length > 0 ? parts.pop() : "item"
      },
      count: 1,
      index: index + 1
    }
  });
}

import { fileURLToPath } from "url";

if (process.argv[1] == fileURLToPath(import.meta.url)) {
  clipboard.writeSync(strings.encode(createMainBus([
    "plastic-bar",
    [ "iron-ore", "copper-ore" ],
    "fluid:sulfuric-acid",
    "virtual:signal-red",

    ...new Array(12).fill("copper-ore")
  ]).toObject()));
}

export default createMainBus;
