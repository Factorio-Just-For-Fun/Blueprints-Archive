// Code stolen from https://github.com/demipixel/factorio-generators/blob/master/tools/lib/landfill.js
import entities from './entities.mjs';

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
    // add a rectangle of landfill defined by the entity's 'size' property
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

  return blueprint;
}

export default generateLandfill;
