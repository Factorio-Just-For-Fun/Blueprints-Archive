import { BlueprintBook } from '../objects.mjs';

import mainbase from './mainbase.mjs';
import military from './military.mjs';
import outposts_unbeaconed from './outposts-unbeaconed-3-8.mjs';
import outposts from './outposts-3-8.mjs';
import rails from './rails.mjs';
import science from './science-expensive.mjs';
import solar from './solar.mjs';

//
// Start Program
//

function generateFJFFBaseBook() {
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
      description: "Starter Game Blueprints for the Factorio Just For Fun Server. Compiled, scripted, and filtered by Ashy.",
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

function generateBaseBook() {
  return new BlueprintBook({
    blueprint_book: {
      item: "blueprint_book",
      label: "Starter Book",
      icons: [
        { signal: { type: "virtual", name: "signal-A" }, index: 1 },
        { signal: { type: "virtual", name: "signal-S" }, index: 2 },
        { signal: { type: "virtual", name: "signal-H" }, index: 3 },
        { signal: { type: "virtual", name: "signal-Y" }, index: 4 }
      ],
      description: "Starter Game Blueprints. Compiled, scripted, and filtered by Ashy.",
      blueprints: [],
      active_index: 0,
      version: 281479275675648
    }
  })
}

function generate(flags) {
  let blueprintBook = (flags.fjff ? generateFJFFBaseBook() : generateBaseBook())
    .addObject("./blueprints/balancers-raynquist.txt")
    .addObject(rails(flags))
    .addObject("./blueprints/rail-misc/construction-compendium.txt")

  if (flags.trains.includes("3-8")) {
    blueprintBook = blueprintBook.addObject(outposts(flags))
    .addObject(outposts_unbeaconed(flags))
  }

  blueprintBook = blueprintBook.addObject(mainbase(flags))

  if (flags.normal) {
    blueprintBook = blueprintBook.addObject("./blueprints/belt/science/book-tileable-2.txt")
  }

  if (flags.expensive) {
    blueprintBook = blueprintBook.addObject(science(flags))
      .addObject("./blueprints/belt/science-expensive/early-tileable.txt")
  }

  blueprintBook = blueprintBook.addObject(solar(flags))
    .addObject(military(flags))

    .addObject("./blueprints/power/uranium-processing-kerza.txt")
    .addObject("./blueprints/power/reactor-2.4gw-ferront.txt")
    .addObject("./blueprints/power/reactor-tileable-khornar.txt")
    .addObject("./blueprints/power/starter-216.txt")

  
  
    .addObject("./blueprints/rail-designs-3-8/mines/mines-jrz.txt")
    .addObject("./blueprints/rail-designs-3-8/mines/mine-uranium.txt")
    .addObject("./blueprints/module-upgrader-pixelcort.txt")
    .addObject("./blueprints/deconstruction-ash.txt")

  return blueprintBook;
}

export default generate;
