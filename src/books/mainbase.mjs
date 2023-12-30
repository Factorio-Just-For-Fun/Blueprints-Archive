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

function generate(flags) {
  let blueprintBook = new BlueprintBook({
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

  .addObject("./blueprints/belt/fluids-universal/oil-kerza.txt")
  .addObject("./blueprints/belt/fluids-universal/coal-liquefaction-plastic-mskitty.txt")
  .addObject("./blueprints/belt/fluids-universal/solid-fuel-mskitty.txt")
  .addObject("./blueprints/belt/fluids-universal/plastic-double-mskitty.txt")

  .addObject("./blueprints/belt/fluids-universal/sulfur-sulfuric-combined-mskitty.txt")

  if (flags.normal) {
    // Missing: batteries, gears, green chips, red chips, blue chips
    // blueprintBook = blueprintBook.addObject("./blueprints/belt/")
  }

  if (flags.expensive) {
    blueprintBook = blueprintBook.addObject("./blueprints/belt/fluids-expensive/batteries-mskitty.txt")

      .addObject("./blueprints/belt/intermediates-expensive/gears-mskitty.txt")
      .addObject("./blueprints/belt/intermediates-expensive/green-chips-drsupergood.txt")
      .addObject("./blueprints/belt/intermediates-expensive/green-chips-15k-mskitty.txt")
      .addObject("./blueprints/belt/intermediates-expensive/red-chips-kerza.txt")
      .addObject("./blueprints/belt/intermediates-expensive/red-chips-3.6k-mskitty.txt")
      .addObject("./blueprints/belt/intermediates-expensive/blue-chips-mskitty.txt")
  }

  blueprintBook = blueprintBook.addObject("./blueprints/belt/science/labs.txt")

    .addObject("./blueprints/smelting/kos-ash.txt")
    .addObject("./blueprints/smelting/bus-upgradeable-mskitty.txt")
    .addObject("./blueprints/smelting/steel-upgradeable-mskitty.txt")
    .addObject("./blueprints/smelting/side-loading-copper-mskitty.txt")
    .addObject("./blueprints/smelting/side-loading-iron-mskitty.txt")
    .addObject("./blueprints/smelting/steel-mskitty.txt");

  return blueprintBook;
}

export default generate;
