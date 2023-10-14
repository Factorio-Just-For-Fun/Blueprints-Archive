import { BlueprintBook } from '../objects.mjs';

const blueprintBook = new BlueprintBook({
  blueprint_book: {
    item: "blueprint_book",
    label: "Construction Outpost [item=locomotive] [item=assembling-machine-3]",
    icons: [
      { signal: { type: "item", name: "locomotive" }, index: 1 },
      { signal: { type: "item", name: "deconstruction-planner" }, index: 2 }
    ],
    blueprints: [],
    active_index: 0,
    version: 281479275675648
  }
})
.addObject("./blueprints/rail-misc/construction-load-spzi.txt")
.addObject("./blueprints/rail-misc/construction-unload-spzi.txt")
.addObject("./blueprints/rail-misc/mine-builder.txt")
.addObject("./blueprints/rail-misc/trash-train.txt")
.addObject("./blueprints/rail-misc/trash-unload.txt")
.addObject("./blueprints/rail-misc/construction-unload-spzi.txt")
.addObject("./blueprints/rail-misc/module-load.txt")
.addObject("./blueprints/rail-misc/module-unload.txt")
.addObject("./blueprints/rail-misc/module-unload-t1.txt")
.addObject("./blueprints/rail-misc/reactor-load.txt")
.addObject("./blueprints/rail-misc/reactor-unload.txt")

export default blueprintBook;
