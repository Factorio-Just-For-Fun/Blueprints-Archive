import clipboard from 'clipboardy';
import util from './util.mjs';

//
// Run Program
//

console.dir(util.decodeBlueprintString(clipboard.readSync()), { depth: 5 });
