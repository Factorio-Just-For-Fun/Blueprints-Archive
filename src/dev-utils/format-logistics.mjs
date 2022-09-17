import clipboard from 'clipboardy';
import strings from '../util/strings.mjs';

import LogisticRequests from '../logistics/request.mjs';
import { parseObject } from '../objects.mjs';

const blueprint = parseObject(strings.decode(clipboard.readSync()));
const requests = new LogisticRequests();
requests.fromBlueprint(blueprint);
clipboard.writeSync(strings.encode(requests.toBlueprint(false).toObject()));
