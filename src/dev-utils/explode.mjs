import fs from 'fs/promises';
import path from 'path';
import util from '../util.mjs';

//
// CONFIG
//

const explodeDir = './explode';

//
// Run Program
//

// Create if not exist
await fs.mkdir(explodeDir, { recursive: true });

// Iterate over files
for (let file of await fs.readdir(explodeDir, { withFileTypes: true })) {
  // Ignore directories
  if (file.isDirectory()) continue;

  const object = util.decodeBlueprintString(await fs.readFile(path.join(explodeDir, file.name), 'utf-8'));

  // Ignore non-blueprint-books
  if (!object.blueprint_book) {
    console.log(`${fileName} is not a blueprint book. Skipping.`);
    continue;
  }

  // Create output dir
  const outputDir = path.join(explodeDir, file.name.split(".")[0]);
  await fs.mkdir(outputDir, { recursive: true });

  // Iterate over BPs
  for (let blueprint of object.blueprint_book.blueprints) {
    // Delete index
    delete blueprint.index;

    // Write file
    await fs.writeFile(path.join(outputDir, blueprint.blueprint.label.replace(/[\\/]/g, "") + ".txt"), util.encodeBlueprintString(blueprint));
  }
}
