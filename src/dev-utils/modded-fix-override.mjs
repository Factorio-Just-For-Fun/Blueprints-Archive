import clipboard from 'clipboardy';
import strings from '../util/strings.mjs';
import { parseObject, Blueprint, BlueprintBook } from '../objects.mjs';

// This overwrites all modules, everywhere. This does not (currently) have a list of all assembler recipes
// If something needs fixed with assemblers, let Ashy know, or write something and submit a PR.
const configByType = {
  'beacon': { 'speed-module-3': 2 },
  'lab': { 'productivity-module-3': 2 }
}

const fullProdAssemb = { 'productivity-module-3': 4 }
const fullSpeedAssemb = { 'speed-module-3': 4 }
const fullProdChem = { 'productivity-module-3': 3 }
const configByRecipe = {
  'advanced-oil-processing': fullProdChem,
  'basic-oil-processing': fullProdChem,
  'heavy-oil-cracking': fullProdChem,
  'explosives': fullProdChem,
  'light-oil-cracking': fullProdChem,
  'battery': fullProdChem,
  'sulfur': fullProdChem,
  'sulfuric-acid': fullProdChem,
  'plastic-bar': fullProdChem,
  'solid-fuel-from-light-oil': fullProdAssemb,
  'solid-fuel-from-petroleum-gas': fullProdAssemb,
  'rocket-fuel': fullProdAssemb,
  'copper-cable': fullProdAssemb,
  'electronic-circuit': fullProdAssemb,
  'utility-science-pack': fullProdAssemb,
  'engine-unit': fullProdAssemb,
  'electric-engine-unit': fullProdAssemb,
  'flying-robot-frame': fullProdAssemb,
  'iron-gear-wheel': fullProdAssemb,
  'advanced-circuit': fullProdAssemb,
  'processing-unit': fullProdAssemb,
  'low-density-structure': fullProdAssemb,
  'automation-science-pack': fullProdAssemb,
  'logistic-science-pack': fullProdAssemb,
  'production-science-pack': fullProdAssemb,
  'iron-stick': fullProdAssemb,
  'rocket-control-unit': fullProdAssemb,
  'chemical-science-pack': fullProdAssemb,
  'transport-belt': fullSpeedAssemb,
  'rail': fullSpeedAssemb,
  'electric-furnace': fullSpeedAssemb,
  'inserter': fullSpeedAssemb,
  'pipe': fullSpeedAssemb,
  'rocket': fullSpeedAssemb,
  'explosive-rocket': fullSpeedAssemb,
  'speed-module': fullSpeedAssemb,
  'speed-module-2': fullSpeedAssemb,
  'speed-module-3': fullSpeedAssemb,
  'productivity-module': fullSpeedAssemb,
  'productivity-module-2': fullSpeedAssemb,
  'productivity-module-3': fullSpeedAssemb,

  'rocket-part': fullProdAssemb
}


//
// Fix print
//

const unlisted = new Set();

function downgradeModules(object) {
  if (object instanceof BlueprintBook) {
    blueprintBook.blueprints.forEach(downgradeModules);
  } else if (object instanceof Blueprint) {
    object.entities.forEach(it => {
      if (it.name && configByType[it.name]) it.items = configByType[it.name];
      else if (it.recipe) {
        if (configByRecipe[it.recipe]) it.items = configByRecipe[it.recipe];
        else {
          if (unlisted.has(it.recipe)) return;
          unlisted.add(it.recipe);
          console.log(`Recipe not found: ${ it.recipe }`);
        }
      }
    });
  }

  return object;
}

export default downgradeModules;

//
// Run Program
//
import { fileURLToPath } from "url";

if (process.argv[1] == fileURLToPath(import.meta.url)) {
  const blueprint = parseObject(strings.decode(clipboard.readSync()));
  clipboard.writeSync(strings.encode(downgradeModules(blueprint).toObject()));
}
