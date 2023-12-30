import { BlueprintBook } from '../objects.mjs';

function generate(flags) {
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
    "./blueprints/belt/science-expensive/red-1kmin-mskitty.txt",
    "./blueprints/belt/science-expensive/green-1kmin-mskitty.txt",
    "./blueprints/belt/science-expensive/blue-1kmin-mskitty.txt",
    "./blueprints/belt/science-expensive/gray-1kmin-mskitty.txt",
    "./blueprints/belt/science-expensive/purple-1kmin-red-mskitty.txt",
    "./blueprints/belt/science-expensive/yellow-1kmin-mskitty.txt",
    "./blueprints/belt/science-expensive/space-1kmin-mskitty.txt",
    "./blueprints/belt/intermediates-expensive/low-density-structure-fixed-337-mskitty.txt"
  );
}

export default generate;
