import { Config } from '../@types/Config';
import ConfigData from '../config.json';

const CONFIG_OBJ: Config = ConfigData;
const CLI_ARGS = process.argv.slice(2);

// non-arg CLI menu
if(CLI_ARGS.length == 1) {
	console.log(CONFIG_OBJ.menu.join('\n'));
	process.exit();
}

// parsing file argument
if(CLI_ARGS[1] == '-f') {
	if(CLI_ARGS.length == 2) process.exit();

	console.log(CLI_ARGS[2]);
}