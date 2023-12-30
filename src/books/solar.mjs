import { parseObject } from '../objects.mjs';

function generate(flags) {
  return parseObject("./blueprints/power/solar-mskitty.txt")
    .setContents("Solar 87% Ratio mskitty")
    .explode()
    .addObject("./blueprints/malls/solar/solar-mskitty.txt")
    .addObject("./blueprints/malls/solar/accumulator-mskitty.txt")
}

export default generate;
