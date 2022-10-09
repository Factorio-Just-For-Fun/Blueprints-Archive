import clipboard from 'clipboardy';
import strings from '../util/strings.mjs';

//
// Run Program
//

console.dir(strings.decode(clipboard.readSync()), { depth: process.argv[process.argv.length - 1] });
