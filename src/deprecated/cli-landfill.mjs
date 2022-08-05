import clipboard from 'clipboardy';
import strings from '../util/strings.mjs';
import landfill from '../landfill.mjs';
import { parseObject, Blueprint, BlueprintBook } from '../objects.mjs';

//
// Run Program
//

const blueprint = parseObject(strings.decode(clipboard.readSync()));
landfill(blueprint)

clipboard.writeSync(strings.encode(blueprint.toObject()));
