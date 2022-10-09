import { parseObject } from '../objects.mjs';
import path from 'path';
import fs from 'fs/promises';

import printObject from './tree-object.mjs'

//
// CONFIG
//
const sourceDir = "./blueprints";

// Space = root dir
async function printDirectory(relativePath, directoryName, depth = 0) {
  console.log(" ".repeat(depth * 2) + "- " + directoryName);
  for (let file of await fs.readdir(relativePath, { withFileTypes: true })) {
    let filePath = path.join(relativePath, file.name);
    if (file.isDirectory()) {
      await printDirectory(filePath, file.name, depth + 1);
    } else {
      await printObject(parseObject(filePath), depth + 1);
    }
  }
}

//
// Start Program
//

await printDirectory(sourceDir, "Root");
