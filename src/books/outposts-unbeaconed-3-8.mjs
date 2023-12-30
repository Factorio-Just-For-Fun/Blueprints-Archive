import { BlueprintBook } from '../objects.mjs';

function generate(flags) {
  var blueprintBook = new BlueprintBook({
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
  .addObject("./blueprints/rail-designs-3-8/smelting/steel-nobeacon-mskitty.txt")

  if (flags.expensive) {
    blueprintBook = blueprintBook
      .addObject("./blueprints/rail-designs-3-8/intermediates-expensive/green-chips-no-beacon-kerza.txt")
  }

  return blueprintBook;
}

export default generate;
