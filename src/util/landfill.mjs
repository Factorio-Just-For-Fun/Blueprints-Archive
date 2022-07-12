// Code stolen from https://github.com/demipixel/factorio-generators/blob/master/tools/lib/landfill.js
import entities from './entities.mjs';


// `curved_rail`s require special landfill shapes. the below offsets were generated in `/editor` mode using Factorio 1.1.59
const curvedRailLandfillRequirementsByDirection = [
  [[-3, -3], [-3, -2], [-2, -4], [-2, -3], [-2, -2], [-2, -1], [-1, -3], [-1, -2], [-1, -1], [-1, 0], [0, -2], [0, -1], [0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3]],
  [[-2, 0], [-2, 1], [-2, 2], [-2, 3], [-1, -2], [-1, -1], [-1, 0], [-1, 1], [-1, 2], [-1, 3], [0, -3], [0, -2], [0, -1], [0, 0], [1, -4], [1, -3], [1, -2], [1, -1], [2, -3], [2, -2]],
  [[-4, 0], [-4, 1], [-3, 0], [-3, 1], [-2, 0], [-2, 1], [-1, -1], [-1, 0], [-1, 1], [0, -2], [0, -1], [0, 0], [1, -3], [1, -2], [1, -1], [1, 0], [2, -3], [2, -2], [2, -1], [3, -2]],
  [[-4, -2], [-4, -1], [-3, -2], [-3, -1], [-2, -2], [-2, -1], [-1, -2], [-1, -1], [-1, 0], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2], [3, 1]],
  [[-2, -4], [-2, -3], [-2, -2], [-2, -1], [-1, -4], [-1, -3], [-1, -2], [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [1, 3], [2, 1], [2, 2]],
  [[-3, 1], [-3, 2], [-2, 0], [-2, 1], [-2, 2], [-2, 3], [-1, -1], [-1, 0], [-1, 1], [-1, 2], [0, -4], [0, -3], [0, -2], [0, -1], [0, 0], [0, 1], [1, -4], [1, -3], [1, -2], [1, -1]],
  [[-4, 1], [-3, 0], [-3, 1], [-3, 2], [-2, -1], [-2, 0], [-2, 1], [-2, 2], [-1, -1], [-1, 0], [-1, 1], [0, -2], [0, -1], [0, 0], [1, -2], [1, -1], [2, -2], [2, -1], [3, -2], [3, -1]],
  [[-4, -2], [-3, -3], [-3, -2], [-3, -1], [-2, -3], [-2, -2], [-2, -1], [-2, 0], [-1, -2], [-1, -1], [-1, 0], [0, -1], [0, 0], [0, 1], [1, 0], [1, 1], [2, 0], [2, 1], [3, 0], [3, 1]],
];

// diagonal `straight_rail`s require less landfill than their `size`-based bounding box. the below offsets were generated in `/editor` mode using Factorio 1.1.59
const straightRailLandfillRequirementsByDirection = [
  undefined, // not diagonal, so default to standard rectangle
  [[0, 0], [1, -1], [1, 0], [1, 1], [2, 0]],
  undefined, // not diagonal, so default to standard rectangle
  [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]],
  undefined, // not diagonal, so default to standard rectangle
  [[-1, 1], [0, 0], [0, 1], [0, 2], [1, 1]],
  undefined, // not diagonal, so default to standard rectangle
  [[-1, 0], [0, -1], [0, 0], [0, 1], [1, 0]],
];



function getSpecialLandfillOffsets(entity) {
  if (entity.name === 'curved_rail') {
    return curvedRailLandfillRequirementsByDirection[entity.direction ?? 0];
  }
  else if (entity.name === 'straight_rail') {
    return straightRailLandfillRequirementsByDirection[entity.direction ?? 0];
  }
  return undefined;
}

// This will override all tiles
function generateLandfill(blueprint) {
  blueprint.tiles = [];

  for (let entity of blueprint.entities) {
    // offshore pumps are built on water, so don't create landfill for them
    if (entity.name === 'offshore_pump') return;

    let position = {
      x: entity.position.x,
      y: entity.position.y,
    }

    // look up if there is a special offset list for this entity
    let specialOffsets = getSpecialLandfillOffsets(entity);
    if (specialOffsets !== undefined) {
      for (const offset of specialOffsets) {
        blueprint.tiles.push({
          name: "landfill",
          position: {
            x: position.x + offset[0],
            y: position.y + offset[1]
          }
        });
      }
    } else { // otherwise, add a rectangle of landfill defined by the entity's 'size' property
      let dimensions = entities.size[entity.name] ?? { x: 1, y: 1 };
      if (entity.direction % 4 == 2) { // If rotated, rotate the dimensions
        dimensions = { x: dimensions.y, y: dimensions.x };
      }

      // Move position to corner first (lowest coords)
      position.x -= dimensions.x / 2;
      position.y -= dimensions.y / 2;

      for (let ox = 0; ox < dimensions.x; ox++) {
        for (let oy = 0; oy < dimensions.y; oy++) {
          blueprint.tiles.push({
            name: "landfill",
            position: {
              x: position.x + ox,
              y: position.y + oy
            }
          });
        }
      }
    }
  }

  return blueprint;
}

export default generateLandfill;
