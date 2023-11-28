import { BlueprintBook } from '../objects.mjs';

import createMainBus from '../main-bus.mjs';


function generateMainBus() {
  let object = createMainBus([
    "space-science-pack",
    [ "production-science-pack", "utility-science-pack" ],
    [ "military-science-pack", "chemical-science-pack" ],
    [ "automation-science-pack", "logistic-science-pack" ],

    ...new Array(12).fill("iron-plate"),
    ...new Array(12).fill("copper-plate"),
    ...new Array(4).fill("steel-plate"),

    "fluid:water",
    "fluid:lubricant",
    "fluid:light-oil",
    "fluid:sulfuric-acid",

    ...new Array(8).fill("electronic-circuit"),
    ...new Array(12).fill("plastic-bar"),

    "advanced-circuit",
    "advanced-circuit",
    "advanced-circuit",
    "processing-unit",

    "stone",
    "stone",
    "stone-brick",
    "stone-brick",

    "coal",
    "coal",
    "battery",
    "concrete"
  ]);

  object.label = "Main Bus [Ashy]";
  return object;
}

const blueprintBook = new BlueprintBook({
    blueprint_book: {
      item: "blueprint_book",
      label: "Main Base",
      icons: [
        { signal: { type: "item", name: "electronic-circuit" }, index: 1 },
        { signal: { type: "item", name: "sulfur" }, index: 2 },
        { signal: { type: "item", name: "plastic-bar" }, index: 3 },
        { signal: { type: "item", name: "constant-combinator" }, index: 4 }
      ],
      blueprints: [],
      active_index: 0,
      version: 281479275675648
    }
  }).addObject(generateMainBus())
  .addObject("./blueprints/malls/kos-kerza-updated.txt")
  .addObject("./blueprints/malls/belts.txt")
  .addObject("./blueprints/malls/bot-factory.txt")

  .addObject("./blueprints/belt/fluids/oil-kerza.txt")
  .addObject("./blueprints/belt/fluids/coal-liquefaction-plastic-mskitty.txt")
  .addObject("./blueprints/belt/fluids/solid-fuel-expensive-mskitty.txt")
  .addObject("./blueprints/belt/fluids/plastic-double-mskitty.txt")

  .addObject("./blueprints/belt/fluids/sulfur-sulfuric-combined-mskitty.txt")
  .addObject("./blueprints/belt/fluids/batteries-mskitty.txt")

  .addObject("./blueprints/belt/intermediates/gears-mskitty.txt")
  .addObject("./blueprints/belt/intermediates/green-chips-expensive-drsupergood.txt")
  .addObject("./blueprints/belt/intermediates/green-chips-15k-expensive-mskitty.txt")
  .addObject("./blueprints/belt/intermediates/red-chips-expensive-kerza.txt")
  .addObject("./blueprints/belt/intermediates/red-chips-expensive-3.6k-mskitty.txt")
  .addObject("./blueprints/belt/intermediates/blue-chips-mskitty.txt")

  .addObject("./blueprints/belt/labs.txt")

  .addObject("./blueprints/smelting/kos-ash.txt")
  .addObject("./blueprints/smelting/bus-upgradeable-mskitty.txt")
  .addObject("./blueprints/smelting/steel-upgradeable-mskitty.txt")
  .addObject("./blueprints/smelting/side-loading-copper-mskitty.txt")
  .addObject("./blueprints/smelting/side-loading-iron-mskitty.txt")
  .addObject("./blueprints/smelting/steel-mskitty.txt");

export default blueprintBook;
