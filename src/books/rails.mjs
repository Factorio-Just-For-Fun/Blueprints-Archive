import { BlueprintBook } from '../objects.mjs';


function generate(flags) {
  let blueprintBook = new BlueprintBook({
    blueprint_book: {
      item: "blueprint_book",
      label: "3-8 Rail Network",
      icons: [
        { signal: { type: "virtual", name: "signal-4" }, index: 1 }
      ],
      blueprints: [],
      active_index: 0,
      version: 281479275675648
    }
  })
  .addObject("./blueprints/rail-grids-3-8/2-3-width-spzi.txt")
  .addObject("./blueprints/rail-grids-3-8/4-3-width-spzi.txt")
  .addObject("./blueprints/rail-grids-3-8/3-8-stackers-mskitty.txt")
  .addObject("./blueprints/rail-grids-3-8/fuels-spzi.txt")

  if (flags.trains.includes("3-8")) {
    blueprintBook = blueprintBook
      .addObject("./blueprints/rail-grids-3-8/solid-loading-spzi-kerza.txt")
      .addObject("./blueprints/rail-grids-3-8/liquid-loading-spzi-mskitty-kerza.txt")
      .addObject("./blueprints/rail-grids-3-8/trains-mskitty.txt");
  }

  return blueprintBook;
}

export default generate;
