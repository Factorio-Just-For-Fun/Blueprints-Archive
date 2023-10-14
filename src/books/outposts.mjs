import { BlueprintBook } from '../objects.mjs';

const blueprintBook = new BlueprintBook({
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

.addObject("./blueprints/rail-designs-3-8/intermediates/green-chips-from-raw-kerza-start.txt")
.addObject("./blueprints/rail-designs-3-8/intermediates/green-chips-from-raw-kerza-extension.txt")

.addObject("./blueprints/rail-designs-3-8/intermediates/red-chips-mskitty.txt")
.addObject("./blueprints/rail-designs-3-8/intermediates/red-chips-kerza-start.txt")
.addObject("./blueprints/rail-designs-3-8/intermediates/red-chips-kerza-extension.txt")

.addObject("./blueprints/rail-designs-3-8/intermediates/blue-chips-cfras5.txt")

.addObject("./blueprints/rail-designs-3-8/fluids/plastic-advanced-mskitty.txt")
.addObject("./blueprints/rail-designs-3-8/fluids/coal-liquefaction-plastic-mskitty.txt")

.addObject("./blueprints/rail-designs-3-8/science/all-science-updated-kerza.txt")
.addObject("./blueprints/rail-designs-3-8/modules/modules-from-raw-kerza.txt")

export default blueprintBook;
