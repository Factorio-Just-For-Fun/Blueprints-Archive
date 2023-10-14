import fs from 'fs/promises';
import path from 'path';
import strings from '../util/strings.mjs';

import { parseObject } from '../objects.mjs';
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

  const object = strings.decode(await fs.readFile(path.join(explodeDir, file.name), 'utf-8'));

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
    blueprint = parseObject(blueprint);

    // Write file
    await fs.writeFile(path.join(outputDir, blueprint.label.replace(/[\\/]/g, "") + ".txt"), strings.encode(blueprint.toObject()));
  }
}
