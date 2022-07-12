import util from './util.mjs';
import { parseObject, BlueprintBook } from './objects.mjs';

import fs from 'fs/promises';

//
// Start Progrma
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
    description: "Starter Game Blueprints for the Factorio Just For Fun Server. Note that several blueprint books have been filtered to remove prints that we don't use on the server.\n\n" +
      "Compiled and filtered by i_cant_think_of_a_username. Blueprint station names have been standardized to include spaces.",
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
  .addObject("./blueprints/wallmoeba-spzi.txt")
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
    .addObject("./blueprints/rail-designs-3-8/smelting/clocked-spzi.txt")
    .addObject(undefined)
    .addObject("./blueprints/rail-designs-3-8/intermediates/green-chips-spzi.txt")
    .addObject("./blueprints/rail-designs-3-8/intermediates/red-chips-spzi.txt")
    .addObject("./blueprints/rail-designs-3-8/intermediates/blue-chips-spzi.txt")
    .addObject("./blueprints/rail-designs-3-8/intermediates/plastic-petrol-coal-liq-mskitty.txt")

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
    .addObject("./blueprints/rail-designs-3-8/science/low-density-structure-expensive-mskitty.txt")

    .addObject("./blueprints/rail-designs-3-8/science/rocket-fuel-expensive-mskitty-belt.txt")
    .addObject("./blueprints/rail-designs-3-8/science/rcu-spzi.txt")
    .addObject("./blueprints/rail-designs-3-8/science/white-spzi.txt")
  )
  .addObject(parseObject("./blueprints/pax.txt")
    .setContents("./blueprints/pax-depot-ash.txt", "PAX Train", 8) // 8 is the pax load without solars
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
      "./blueprints/belt/intermediates/low-density-structure-4x4-500m-expensive-mskitty.txt",
      "./blueprints/belt/intermediates/low-density-structure-8x2-500m-expensive-mskitty.txt",
      "./blueprints/belt/intermediates/rcu-360m-expensive-mskitty.txt",
      "./blueprints/belt/intermediates/rocket-fuel-370m-expensive-mskitty.txt"
    )
  )
  .addObject("./blueprints/malls/hub-nilaus.txt")
  .addObject("./blueprints/malls/armor-equipment-elderaxe.txt")
  .addObject("./blueprints/construction-outpost-spzi.txt")
  .addObject(parseObject("./blueprints/power/solar-mskitty.txt")
    .setContents("Solar 87% Ratio mskitty", "1-1 Solar Load mskitty", "Solar Drop mskitty")
    .explode()
  )
  .addObject("./blueprints/malls/coma-spzi.txt")
  .addObject("./blueprints/belt/intermediates/green-chips-expensive-drsupergood.txt")
  .addObject("./blueprints/belt/intermediates/red-chips-expensive-drsupergood.txt")
  .addObject("./blueprints/smelting/kos-ash.txt")
  .addObject(parseObject("./blueprints/tileset.txt")
    .findBlueprint("Hexagon")
    .modify(it => it["absolute-snapping"] = true)
    .modify(it => it["snap-to-grid"] = { x: 32, y: 36 })
    .modify(it => it["position-relative-to-grid"] = { x: 1, y: 2 })
  )
  .addObject("./blueprints/power/uranium-left-mskitty.txt")
  .addObject("./blueprints/power/uranium-processing-mskitty.txt")
  .addObject("./blueprints/power/reactor-5gw-mskitty.txt")
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
      "./blueprints/rail-designs-3-8/modules/modules-on-rails-spzi.txt"
    )
  )
  .addObject("./blueprints/deconstruction-ash.txt")
  .addObject("./blueprints/malls/military-hub-2.txt")

  .modifyAllStationNames(name => name.replace(/\[\/?color(\=((\d{1,3},\d{1,3},\d{1,3})|(\w+)))?\]/g, '')) // Remove colors
  .modifyAllStationNames(name => name.replace(/(\s\*)+$/g, '')) // Remove stars
  .modifyAllStationNames(name => name.replace(/3\-8/g, '')) // Remove 3-8 indicators
  .modifyAllStationNames(name => name.replace(/\[img=(item|fluid).([\w\-]+)\]/g, '[$1=$2]')) // Fix [img=item/fluid.name] with [item/fluid=name]
  .modifyAllStationNames(name => (name == '' || name == '[U]') ? '☭ Communism' : name) // Replace unnamed stations with Communism
  .modifyAllStationNames(name => name.trim()) // Trim all station names

  .modifyAllDescriptions(description => description ? description : '')
  .modifyAllDescriptions(description => description.replace(/\d{4}-\d{2}-\d{2} FJFF Common Blueprints compiled by i_cant.\nhttps:\/\/discord\.gg\/ehHEDDnPWA/g, '').trim()) // Remove old version tags
  .modifyAllDescriptions(description => `${ description ? description + "\n\n" : "" }${ new Date().toISOString().split('T')[0] } FJFF Blueprints compiled by Ashy.\nhttps://discord.gg/ehHEDDnPWA`); // Add new version tags

const string = await util.encodeBlueprintString(blueprintBook.toObject());

if (!process.env.CI) {
  const clipboard = (await import('clipboardy')).default;
  clipboard.writeSync(string);
}

await fs.writeFile("book.txt", string, "utf-8");