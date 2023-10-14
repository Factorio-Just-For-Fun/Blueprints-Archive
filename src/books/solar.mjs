import { parseObject } from '../objects.mjs';

const blueprintBook = parseObject("./blueprints/power/solar-mskitty.txt")
.setContents("Solar 87% Ratio mskitty", "1-1 Solar Load mskitty", "Solar Drop mskitty")
.explode()
.addObject("./blueprints/malls/solar/solar-mskitty.txt")
.addObject("./blueprints/malls/solar/accumulator-mskitty.txt")

export default blueprintBook;
