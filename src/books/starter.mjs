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
    .addObject("./blueprints/belt/intermediates/sulfur-full-belt-mskitty.txt")
    .addObject("./blueprints/belt/intermediates/sulfuric-acid-mskitty.txt")
    .addObject("./blueprints/belt/intermediates/batteries-mskitty.txt")
    .addObject("./blueprints/malls/solar/solar-mskitty.txt")
    .addObject("./blueprints/malls/solar/accumulator-mskitty.txt")
}

function generateOnRailsBook() {
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
  .addObject(
    parseObject("./blueprints/rail-designs-3-8/smelting/clocked-spzi-kerza.txt")
    /*
    .setContents(
      0, 1, undefined, undefined, undefined, undefined,
      6, 7, undefined, undefined, undefined, undefined,
      ...(parseObject("./blueprints/rail-designs-3-8/smelting/clocked-steel-spzi.txt").explode().blueprints)
    )
    */
  )
  .addObject(
    parseObject("./blueprints/rail-designs-3-8/intermediates/green-chips-spzi.txt")
    .addObject("./blueprints/rail-designs-3-8/intermediates/green-chips-no-beacon-kerza.txt")
    .explode()
  )
  .addObject("./blueprints/rail-designs-3-8/intermediates/red-chips-spzi.txt")
  .addObject("./blueprints/rail-designs-3-8/intermediates/blue-chips-mskitty.txt")
  .addObject("./blueprints/rail-designs-3-8/intermediates/petroleum-advanced-mskitty.txt")
  .addObject("./blueprints/rail-designs-3-8/intermediates/plastic-advanced-mskitty.txt")

  .addObject(parseObject("./blueprints/rail-designs-3-8/science/all-science-12-beacon-kerza.txt").findBlueprint(7))
}

function generateMilitaryBook() {
  return new BlueprintBook({
    blueprint_book: {
      item: "blueprint_book",
      label: "Military Rails",
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
  }).addObject("./blueprints/biters/wallmoeba-mini-ashy.txt")
  .explode()

  .addObject("./blueprints/biters/wallmoeba-segment.txt")
  .addObject("./blueprints/biters/wallmoeba-segment-no-lasers.txt")
  .addObject("./blueprints/malls/military-hub-2.txt")
  .addObject("./blueprints/biters/artillery-shells-mskitty.txt")
  .addObject("./blueprints/biters/war-rails-mskitty.txt")
  .explode()
}

function generateModulesBook() {
  return new BlueprintBook({
    blueprint_book: {
      item: "blueprint_book",
      label: "Modules",
      icons: [
        { signal: { type: "item", name: "iron-ore" }, index: 1 },
        { signal: { type: "item", name: "copper-ore" }, index: 2 },
        { signal: { type: "item", name: "speed-module-3" }, index: 3 },
        { signal: { type: "item", name: "productivity-module-3" }, index: 4 }
      ],
      blueprints: [],
      active_index: 0,
      version: 281479275675648
    }
  }).setContents(
    "./blueprints/rail-designs-3-8/modules/modules-from-raw-spzi-red.txt",
    "./blueprints/rail-designs-3-8/modules/modules-from-raw-spzi-red-full-ashy.txt",
    parseObject("./blueprints/malls/modules.txt").findBlueprint(7)
  );
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
    "./blueprints/belt/intermediates/rocket-fuel-740m-fixed-expensive-mskitty.txt"
  );
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
    ...new Array(8).fill("plastic-bar"),

    "advanced-circuit",
    "advanced-circuit",
    "coal",
    "processing-unit",

    "stone",
    "stone",
    "stone-brick",
    "stone-brick",

    "battery",
    "concrete"
  ]);

  object.label = "Main Bus [Ashy]";
  return object;
}

const blueprintBook = generateBaseBook()
  .addObject("./blueprints/balancers-raynquist.txt")
  .addObject("./blueprints/rail-grids-3-8/3-8-rail-network-spzi.txt")
  .addObject(generateOnRailsBook())
  .addObject(parseObject("./blueprints/rail-misc/pax.txt")
    .setContents("./blueprints/rail-misc/pax-depot-ash.txt", "PAX Train", 8) // 8 is the pax load without solars
  )
  .addObject(generateMainBus())
  .addObject(generateBeltScienceBook())
  .addObject("./blueprints/malls/kos-kerza-updated.txt")
  .addObject("./blueprints/rail-misc/construction-outpost-spzi.txt")
  .addObject(generateSolarBook())
  .addObject(generateMilitaryBook())
  .addObject("./blueprints/belt/intermediates/green-chips-expensive-drsupergood.txt")
  .addObject("./blueprints/belt/intermediates/red-chips-expensive-kerza.txt")
  .addObject("./blueprints/smelting/kos-ash.txt")
  .addObject("./blueprints/decorative/tiles/hexagon-gold-trimmed.txt")
  .addObject("./blueprints/power/uranium-processing-mskitty-updated-ratio-madkatz.txt")
  .addObject("./blueprints/power/reactor-2.4gw-ferront.txt")
  .addObject("./blueprints/power/starter-216.txt")
  .addObject(generateModulesBook())
  .addObject("./blueprints/deconstruction-ash.txt")
  .addObject("./blueprints/module-upgrader-pixelcort.txt");

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
