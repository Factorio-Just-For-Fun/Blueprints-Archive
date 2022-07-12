import clipboard from 'clipboardy';
import strings from '../util/strings.mjs';
import { parseObject, Blueprint, BlueprintBook } from '../objects.mjs';

// Note that this only works if the print's modules still exist

//
// Fix print
//

function downgradeModules(object) {
  if (object instanceof BlueprintBook) {
    blueprintBook.blueprints.forEach(downgradeModules);
  } else if (object instanceof Blueprint) {
    object.entities.filter(it => it.items).forEach(it => {
      const items = it.items;

      for (let type of ["speed", "productivity", "effectivity"]) {

        // 4 -> 3
        if (items[`${ type }-module-4`]) {
          items[`${ type }-module-3`] = items[`${ type }-module-3`];
          delete items[`${ type }-module-4`];
        }

        // 3 -> 2
        if (items[`${ type }-module-3`]) {
          items[`${ type }-module-2`] = items[`${ type }-module-3`];
          delete items[`${ type }-module-3`];
        }

        // 2 -> 1
        if (items[`${ type }-module-2`]) {
          items[`${ type }-module`] = items[`${ type }-module-2`];
          delete items[`${ type }-module-2`];
        }
      }

      return it;
    });
  }

  return object;
}

//
// Run Program
//

const blueprint = parseObject(util.decode(clipboard.readSync()));

clipboard.writeSync(util.encode(downgradeModules(blueprint).toObject()));
