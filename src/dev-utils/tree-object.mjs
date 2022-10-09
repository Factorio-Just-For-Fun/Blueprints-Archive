import { parseObject, BlueprintBook, Blueprint } from '../objects.mjs';
import path from 'path';
import fs from 'fs/promises';

//
// CONFIG
//
const sourceDir = "./blueprints";

// Space = root dir
async function printObject(object, depth = 0) {
  let name = object.label;
  if (object.upgrade_planner) name = "Upgrade Planner";
  else if (object.deconstruction_planner) name = "Deconstruction Planner";

  console.log(" ".repeat(depth * 2) + "- " + name);
  if (object instanceof BlueprintBook) {
    for (let index in object.blueprints) {
      let blueprint = object.blueprints[index];
      printObject(blueprint, depth + 1);
    }
  }
}

//
// Start Program
//

import { fileURLToPath } from "url";
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  await printObject(await parseObject(process.argv.pop()));
}

export default printObject;
