import { BlueprintBook } from '../objects.mjs';

function generate(flags) {
  let blueprintBook = new BlueprintBook({
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
  }).addObject("./blueprints/rail-designs-3-8/smelting/clocked-kerza.txt")
    .addObject("./blueprints/rail-designs-3-8/fluids-universal/plastic-advanced-mskitty.txt")
    .addObject("./blueprints/rail-designs-3-8/fluids-universal/coal-liquefaction-plastic-mskitty.txt")

  if (flags.expensive) {
    blueprintBook = blueprintBook
      .addObject("./blueprints/rail-designs-3-8/intermediates-expensive/green-chips-from-raw-kerza-start.txt")
      .addObject("./blueprints/rail-designs-3-8/intermediates-expensive/green-chips-from-raw-kerza-extension.txt")
      .addObject("./blueprints/rail-designs-3-8/science-expensive/all-science-from-raw-kerza.txt")
  }

  blueprintBook = blueprintBook
    .addObject("./blueprints/rail-designs-3-8/modules-expensive/modules-from-raw-kerza.txt");

  return blueprintBook;
}

export default generate;
