import { BlueprintBook } from '../objects.mjs';

const blueprintBook = new BlueprintBook({
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
  "./blueprints/belt/science/space-1kmin-expensive-mskitty.txt",
  "./blueprints/belt/intermediates/low-density-structure-fixed-337-expensive-mskitty.txt"
);

export default blueprintBook;
