import { parseObject, BlueprintBook, Blueprint } from '../objects.mjs';
import patching from '../util/patching.mjs';

//
// Start Program
//

const blueprintBook = new BlueprintBook({
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

  .addObject("./blueprints/balancers-raynquist.txt")
  .addObject("./blueprints/rail-grids-3-8/3-8-rail-network-spzi.txt")
  .addObject(
    parseObject("./blueprints/biters/wallmoeba-mini-ashy.txt")
    .addObject("./blueprints/biters/wallmoeba-segment-only.txt")
    .addObject("./blueprints/malls/military-hub-2.txt")
  )
  .addObject(
    new BlueprintBook({
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
      parseObject("./blueprints/rail-designs-3-8/smelting/clocked-spzi.txt")
      /*
      .setContents(
        0, 1, undefined, undefined, undefined, undefined,
        6, 7, undefined, undefined, undefined, undefined,
        ...(parseObject("./blueprints/rail-designs-3-8/smelting/clocked-steel-spzi.txt").explode().blueprints)
      )
      */
    )
    .addObject("./blueprints/rail-designs-3-8/intermediates/green-chips-spzi.txt")
    .addObject("./blueprints/rail-designs-3-8/intermediates/red-chips-spzi.txt")
    .addObject("./blueprints/rail-designs-3-8/intermediates/blue-chips-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/intermediates/petroleum-advanced-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/intermediates/plastic-advanced-mskitty.txt")

    .addObject("./blueprints/rail-designs-3-8/science/red-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/science/green-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/science/blue-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/science/engines-expensive-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/intermediates/sulfur-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/intermediates/sulfuric-acid-mskitty.txt")


    .addObject("./blueprints/rail-designs-3-8/science/rails-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/science/electric-furnace-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/science/prod-mod-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/science/purple-mskitty.txt")
    .addObject(undefined)
    .addObject(undefined)

    .addObject(undefined)
    .addObject("./blueprints/rail-designs-3-8/science/yellow-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/science/batteries-expensive-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/science/flying-frame-expensive-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/science/electic-engines-expensive-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/science/low-density-structures-spzi.txt")

    .addObject("./blueprints/rail-designs-3-8/science/rocket-fuel-expensive-mskitty-belt.txt")
    .addObject("./blueprints/rail-designs-3-8/science/rocket-control-units-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/science/speed-mod-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/science/white-spzi.txt")
    .addObject("./blueprints/rail-designs-3-8/science/labs-on-rails-spzi.txt")
    .addObject("./blueprints/rail-designs-3-8/science/science-loader-spzi.txt")
  )
  .addObject(parseObject("./blueprints/rail-misc/pax.txt")
    .setContents("./blueprints/rail-misc/pax-depot-ash.txt", "PAX Train", 8) // 8 is the pax load without solars
  )
  .addObject("./blueprints/bus-layout-expensive.txt")
  .addObject(
    new BlueprintBook({
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
      "./blueprints/belt/science/purple-1kmin-expensive-mskitty.txt",
      "./blueprints/belt/science/yellow-1kmin-expensive-mskitty.txt",
      "./blueprints/belt/intermediates/low-density-structure-fixed-337-expensive-mskitty.txt",
      "./blueprints/belt/intermediates/rcu-744-fixed-expensive-mskitty.txt",
      "./blueprints/belt/intermediates/rocket-fuel-740m-fixed-expensive-mskitty.txt"
    )
  )
  .addObject("./blueprints/malls/mall-kos.txt")
  .addObject("./blueprints/rail-misc/construction-outpost-spzi.txt")
  .addObject(parseObject("./blueprints/power/solar-mskitty.txt")
    .setContents("Solar 87% Ratio mskitty", "1-1 Solar Load mskitty", "Solar Drop mskitty")
    .explode()
    .addObject("./blueprints/belt/intermediates/batteries-mskitty.txt")
    .addObject("./blueprints/malls/solar/solar-mskitty.txt")
    .addObject("./blueprints/malls/solar/accumulator-mskitty.txt")
  )
  .addObject("./blueprints/belt/intermediates/green-chips-expensive-drsupergood.txt")
  .addObject("./blueprints/belt/intermediates/red-chips-kerza.txt")
  .addObject("./blueprints/smelting/kos-ash.txt")
  .addObject("./blueprints/decorative/tiles/hexagon-gold-trimmed.txt")
  .addObject("./blueprints/power/uranium-left-mskitty.txt")
  .addObject("./blueprints/power/uranium-processing-mskitty-updated-ratio-madkatz.txt")
  .addObject("./blueprints/power/reactor-2.4gw-ferront.txt")
  .addObject("./blueprints/power/starter-216.txt")
  .addObject(
    new BlueprintBook({
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
      "./blueprints/rail-designs-3-8/modules/modules-from-raw-spzi-base.txt",
      "./blueprints/rail-designs-3-8/modules/modules-from-raw-spzi-extension.txt",
      "./blueprints/rail-designs-3-8/modules/modules-on-rails-mainbase-spzi.txt",
      parseObject("./blueprints/malls/modules.txt").findBlueprint(7)
    )
  )
  .addObject("./blueprints/deconstruction-ash.txt")
  .addObject("./blueprints/module-upgrader-pixelcort.txt");

patching.standardizeStationNames(blueprintBook);

const tag = !process.env.CI ? "Development Book" : "FJFF Blueprints compiled by Ashy.\nhttps://discord.gg/ehHEDDnPWA";
blueprintBook.modifyAllDescriptions(description => `${ description ? description + "\n\n" : "" }${ new Date().toISOString().split("T")[0] } ${tag}`); // Add new version tags
export default blueprintBook;
