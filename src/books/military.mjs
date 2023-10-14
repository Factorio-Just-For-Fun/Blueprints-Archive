import { parseObject, BlueprintBook } from '../objects.mjs';

const blueprintBook = new BlueprintBook({
    blueprint_book: {
      item: "blueprint_book",
      label: "Military",
      icons: [
        { signal: { type: "item", name: "rail" }, index: 1 },
        { signal: { type: "item", name: "beacon" }, index: 2 },
        { signal: { type: "item", name: "explosive-rocket" }, index: 3 },
        { signal: { type: "item", name: "rocket" }, index: 4 }
      ],
      blueprints: [],
      active_index: 0,
      version: 281479275675648
    }
  })
  .addObject(parseObject("./blueprints/biters/wallmoeba-mini-ashy.txt").setContents(2, 3))
  .explode()
  .addObject("./blueprints/biters/wall-station-madkatz.txt")

  .addObject("./blueprints/biters/wallmoeba-segment.txt")
  .addObject("./blueprints/biters/wallmoeba-segment-no-lasers.txt")
  .addObject("./blueprints/biters/explosive-rockets-mskitty.txt")
  .addObject("./blueprints/biters/artillery-shells-mskitty.txt")
  .addObject("./blueprints/biters/war-rails-mskitty.txt")
  .explode()

export default blueprintBook;
