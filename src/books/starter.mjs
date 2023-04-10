import { parseObject, BlueprintBook, Blueprint } from '../objects.mjs';
import patching from '../util/patching.mjs';
import strings from '../util/strings.mjs';

import printObject from '../dev-utils/tree-object.mjs';

import createMainBus from '../main-bus.mjs';

//
// Start Program
//

function generateBaseBook() {
  return new BlueprintBook({
    blueprint_book: {
      item: "blueprint_book",
      label: "[FJFF] Starter",
      icons: [
        { signal: { type: "virtual", name: "signal-F" }, index: 1 },
        { signal: { type: "virtual", name: "signal-J" }, index: 2 },
        { signal: { type: "virtual", name: "signal-F" }, index: 3 },
        { signal: { type: "virtual", name: "signal-F" }, index: 4 }
      ],
      description: "Starter Game Blueprints for the Factorio Just For Fun Server. Compiled, scripted, and filtered by Ashy." + (process.env.GITHUB_SHA ? ' Commit: #' + process.env.GITHUB_SHA.substring(0, 7) : ''),
      blueprints: [],
      active_index: 0,
      version: 281479275675648
    }
  }).addObject("./blueprints/do-not-take-these-ash.txt")
    .addObject("./blueprints/do-not-take-these-ash.txt")
    .addObject("./blueprints/do-not-take-these-ash.txt")
    .addObject("./blueprints/do-not-take-these-ash.txt")
    .addObject("./blueprints/do-not-take-these-ash.txt")
    .addObject("./blueprints/do-not-take-these-ash.txt")
}

// Generate a soalr book with all solar nessecities
function generateSolarBook() {
  return parseObject("./blueprints/power/solar-mskitty.txt")
    .setContents("Solar 87% Ratio mskitty", "1-1 Solar Load mskitty", "Solar Drop mskitty")
    .explode()
    .addObject("./blueprints/malls/solar/solar-mskitty.txt")
    .addObject("./blueprints/malls/solar/accumulator-mskitty.txt")
}

function generateOnRailsBeaconedBook() {
  return new BlueprintBook({
    blueprint_book: {
      item: "blueprint_book",
      label: "X on Rails - Unfiltered",
      icons: [
        { signal: { type: "item", name: "rail" }, index: 1 },
        { signal: { type: "item", name: "beacon" }, index: 2 },
        { signal: { type: "virtual", name: "signal-U" }, index: 3 },
        { signal: { type: "virtual", name: "signal-F" }, index: 4 }
      ],
      blueprints: [],
      active_index: 0,
      version: 281479275675648
    }
  })
  .addObject("./blueprints/rail-designs-3-8/smelting/clocked-kerza.txt")

  .addObject("./blueprints/rail-designs-3-8/intermediates/green-chips-kerza-start.txt")
  .addObject("./blueprints/rail-designs-3-8/intermediates/green-chips-kerza-extension.txt")
  
  .addObject("./blueprints/rail-designs-3-8/intermediates/red-chips-kerza-start.txt")
  .addObject("./blueprints/rail-designs-3-8/intermediates/red-chips-kerza-extension.txt")

  .addObject("./blueprints/rail-designs-3-8/intermediates/blue-chips-cfras5.txt")

  .addObject("./blueprints/rail-designs-3-8/fluids/plastic-advanced-mskitty-kerza.txt")
  .addObject("./blueprints/rail-designs-3-8/fluids/coal-liquefaction-plastic-mskitty.txt")

  .addObject("./blueprints/rail-designs-3-8/science/all-science-updated-kerza.txt")
  .addObject("./blueprints/rail-designs-3-8/modules/modules-cfras5.txt")
}

function generateOnRailsUnbeaconedBook() {
  return new BlueprintBook({
    blueprint_book: {
      item: "blueprint_book",
      label: "X on Rails - Unfiltered (No Beacons)",
      icons: [
        { signal: { type: "item", name: "rail" }, index: 1 },
        { signal: { type: "item", name: "rail" }, index: 2 },
        { signal: { type: "virtual", name: "signal-U" }, index: 3 },
        { signal: { type: "virtual", name: "signal-F" }, index: 4 }
      ],
      blueprints: [],
      active_index: 0,
      version: 281479275675648
    }
  })
  .addObject("./blueprints/rail-designs-3-8/smelting/nobeacon-kerza-start.txt")
  .addObject("./blueprints/rail-designs-3-8/smelting/nobeacon-kerza-extension.txt")
  .addObject("./blueprints/rail-designs-3-8/intermediates/green-chips-no-beacon-kerza.txt")
}

function generateMilitaryBook() {
  return new BlueprintBook({
    blueprint_book: {
      item: "blueprint_book",
      label: "Military",
      icons: [
        { signal: { type: "item", name: "rail" }, index: 1 },
        { signal: { type: "item", name: "beacon" }, index: 2 },
        { signal: { type: "item", name: "explosive-rocket" }, index: 3 },
        { signal: { type: "item", name: "rocket" }, index: 4 }
      ],
      blueprints: [],
      active_index: 0,
      version: 281479275675648
    }
  })
  .addObject(parseObject("./blueprints/biters/wallmoeba-mini-ashy.txt").setContents(2, 3))
  .explode()
  .addObject(parseObject("./blueprints/biters/wall-station-madkatz.txt"))

  .addObject("./blueprints/biters/wallmoeba-segment.txt")
  .addObject("./blueprints/biters/wallmoeba-segment-no-lasers.txt")
  .addObject("./blueprints/biters/explosive-rockets-mskitty.txt")
  .addObject("./blueprints/biters/artillery-shells-mskitty.txt")
  .addObject("./blueprints/biters/war-rails-mskitty.txt")
  .explode()
}

function generateBeltScienceBook() {
  return new BlueprintBook({
    blueprint_book: {
      item: "blueprint_book",
      label: "Science EXPENSIVE mskitty",
      icons: [
        { signal: { type: "item", name: "automation-science-pack" }, index: 1 }
      ],
      blueprints: [],
      active_index: 0,
      version: 281479275675648
    }
  }).setContents(
    "./blueprints/belt/science/red-1kmin-expensive-mskitty.txt",
    "./blueprints/belt/science/green-1kmin-expensive-mskitty.txt",
    "./blueprints/belt/science/blue-1kmin-expensive-mskitty.txt",
    "./blueprints/belt/science/gray-1kmin-expensive-mskitty.txt",
    "./blueprints/belt/science/purple-1kmin-red-expensive-mskitty.txt",
    "./blueprints/belt/science/yellow-1kmin-expensive-mskitty.txt",
    "./blueprints/belt/intermediates/low-density-structure-fixed-337-expensive-mskitty.txt",
    "./blueprints/belt/intermediates/rcu-744-fixed-expensive-mskitty.txt",
    "./blueprints/belt/fluids/rocket-fuel-740m-fixed-expensive-mskitty.txt"
  );
}

function generateMainBase() {
  return new BlueprintBook({
    blueprint_book: {
      item: "blueprint_book",
      label: "Main Base",
      icons: [
        { signal: { type: "item", name: "electronic-circuit" }, index: 1 },
        { signal: { type: "item", name: "sulfur" }, index: 2 },
        { signal: { type: "item", name: "plastic-bar" }, index: 3 },
        { signal: { type: "item", name: "constant-combinator" }, index: 4 }
      ],
      description: "Starter Game Blueprints for the Factorio Just For Fun Server. Compiled, scripted, and filtered by Ashy." + (process.env.GITHUB_SHA ? ' Commit: #' + process.env.GITHUB_SHA.substring(0, 7) : ''),
      blueprints: [],
      active_index: 0,
      version: 281479275675648
    }
  }).addObject(generateMainBus())
  .addObject("./blueprints/malls/kos-kerza-updated.txt")
  .addObject("./blueprints/malls/belts.txt")
  .addObject("./blueprints/malls/bot-factory.txt")

  .addObject("./blueprints/belt/fluids/oil-madkatz.txt")
  .addObject("./blueprints/belt/fluids/coal-liquefaction-plastic-mskitty.txt")
  .addObject("./blueprints/belt/fluids/plastic-double-mskitty.txt")

  .addObject("./blueprints/belt/fluids/sulfur-double-mskitty.txt")
  .addObject("./blueprints/belt/fluids/sulfuric-acid-mskitty.txt")
  .addObject("./blueprints/belt/fluids/batteries-mskitty.txt")

  .addObject("./blueprints/belt/intermediates/gears-mskitty.txt")
  .addObject("./blueprints/belt/intermediates/green-chips-expensive-drsupergood.txt")
  .addObject("./blueprints/belt/intermediates/green-chips-15k-expensive-mskitty.txt")
  .addObject("./blueprints/belt/intermediates/red-chips-expensive-kerza.txt")
  .addObject("./blueprints/belt/intermediates/red-chips-expensive-3.6k-mskitty.txt")
  .addObject("./blueprints/belt/intermediates/blue-chips-jrz-madkatz-mskitty.txt")

  .addObject("./blueprints/belt/labs.txt")

  .addObject("./blueprints/smelting/kos-ash.txt")
  .addObject("./blueprints/smelting/bus-upgradeable-mskitty.txt")
  .addObject("./blueprints/smelting/steel-upgradeable-mskitty.txt")
  .addObject("./blueprints/smelting/side-loading-copper-mskitty.txt")
  .addObject("./blueprints/smelting/side-loading-iron-mskitty.txt")
  .addObject("./blueprints/smelting/steel-mskitty.txt")
}

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

const blueprintBook = generateBaseBook()
  .addObject("./blueprints/balancers-raynquist.txt")
  .addObject("./blueprints/rail-grids-3-8/3-8-rail-network-spzi.txt")
  .addObject("./blueprints/rail-misc/construction-outpost-spzi.txt")

  .addObject(generateOnRailsBeaconedBook())
  .addObject(generateOnRailsUnbeaconedBook())
  .addObject(generateMainBase())

  .addObject(generateBeltScienceBook())
  .addObject("./blueprints/belt/science-non-expensive-2.txt")
  .addObject(generateSolarBook())
  .addObject(generateMilitaryBook())
  .addObject("./blueprints/decorative/tiles/hexagon-gold-trimmed.txt")

  .addObject("./blueprints/power/uranium-processing-mskitty-updated-ratio-madkatz.txt")
  .addObject("./blueprints/power/reactor-2.4gw-ferront.txt")
  .addObject("./blueprints/power/starter-216.txt")

  .addObject("./blueprints/rail-designs-3-8/mines/mines-jrz.txt")
  .addObject("./blueprints/rail-designs-3-8/mines/mine-uranium.txt")
  .addObject("./blueprints/module-upgrader-pixelcort.txt")
  .addObject("./blueprints/deconstruction-ash.txt")

patching.standardizeStationNames(blueprintBook);

if (process.env.CI) { // Add new version tags
  blueprintBook.modifyAllDescriptions(description => `${ description ? description + "\n\n" : "" }${ new Date().toISOString().split("T")[0] } FJFF Blueprints compiled by Ashy314.\nhttps://discord.gg/ehHEDDnPWA`);
}

// Print to console if called directly
import { fileURLToPath } from "url";
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  const clipboard = (await import("clipboardy")).default;

  clipboard.writeSync(strings.encode(blueprintBook.toObject()));
  await printObject(blueprintBook);
}

export default blueprintBook;
