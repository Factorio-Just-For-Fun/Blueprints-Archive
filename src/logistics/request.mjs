import clipboard from 'clipboardy';
import strings from '../util/strings.mjs';

import { Blueprint } from '../objects.mjs';

import { readFile } from 'fs/promises';

// Internal settings
const combinatorRowSize = 10;
const combinatorRowCount = 2;

// Find the order of items from the data file
async function generateItemOrder() {
  const itemOrderRaw = JSON.parse(await readFile("src/logistics/data.json"));

  // Standardize the item order to arrays of length 10 (for combinators)
  // Use Array(n) to fill blank spaces with undefined
  const rows = [];
  for (let row of itemOrderRaw) {
    if (row.length == 0) rows.push(new Array(combinatorRowSize)); // Account for blank rows between sections

    // Slice each row over 10 into rows of 10 or less. This will ignore empty rows.
    for (let i = 0; i <  row.length; i += combinatorRowSize) {
      rows.push(Object.assign(new Array(combinatorRowSize), row.slice(i, i + combinatorRowSize)));
    }
  }

  // Combine each N rows into a single combinator
  const combinators = [];
  for (let i = 0; i < rows.length; i += combinatorRowCount) {
    // Cannot use .flat as that ignores undefined
    combinators.push(rows.slice(i, i+ combinatorRowCount).reduce((acc, val) => [...acc, ...val]));
  }

  return combinators;
}

// Flatten to a list of all acceptable items in the game
const itemOrder = await generateItemOrder();
const allItems = itemOrder.flat();

class LogisticsRequests {
  constructor() {
    this.requests = {};
  }

  fromBlueprint(blueprint) {
    // Find the minimum y
    let minY = undefined;
    for (let entity of blueprint.entities) {
      minY = minY == undefined ? entity.position.y : Math.min(entity.position.y, minY);
    }

    // Load the combinators
    for (let entity of blueprint.entities) {
      entity.control_behavior.filters.forEach(filter => {
        // Add if doesn't exist
        if (!this.requests[filter.signal.name]) this.requests[filter.signal.name] = [0, undefined];

        // Set the count
        this.requests[filter.signal.name][entity.position.y == minY ? 0 : 1] = filter.count;
      });
    }
  }

  toBlueprint(strict) {
    // Create a blank blueprint
    const object = new Blueprint({ blueprint: { version: 281479275675648, entities: [] }});
    for (let templateIndexString in itemOrder) {
      let template = itemOrder[templateIndexString];
      let templateIndex = parseInt(templateIndexString); // are you kidding me?

      // Add minimum
      object.entities.push({
        entity_number: object.entities.length + 1,
        name: 'constant-combinator',
        position: { x: templateIndex + 0.5, y: 0.5},
        control_behavior: {
          filters: template.map((name, index) => name ? {
            signal: {
              type: "item",
              name: name
            },
            count: this.requests[name] ? this.requests[name][0] : 0,
            index: index + 1
          } : undefined).filter(it => it)
        }
      })

      // Add maximum
      // Only add max for nonspecified items if strict
      object.entities.push({
        entity_number: object.entities.length + 1,
        name: 'constant-combinator',
        position: { x: templateIndex + 0.5, y: 4.5},
        control_behavior: {
          filters: template.map((name, index) => name ? {
            signal: {
              type: "item",
              name: name
            },
            count: this.requests[name] ? this.requests[name][1] : 0,
            index: index + 1
          } : undefined).filter(it => it).filter(it => (this.requests[it.signal.name] && this.requests[it.signal.name][1] !== undefined) || strict)
        }
      })
    }

    return object;
  }
}

import { fileURLToPath } from "url";

if (process.argv[1] == fileURLToPath(import.meta.url)) {
  clipboard.writeSync(strings.encode(new LogisticsRequests().toBlueprint().toObject()));
}

export default LogisticsRequests;
