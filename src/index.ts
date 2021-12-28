import { Config } from '../@types/Config';
import ConfigData from '../config.json';

const CONFIG_OBJ: Config = ConfigData;
const CLI_ARGS = process.argv.slice(2);

if(CLI_ARGS.length == 1) {
	console.log(CONFIG_OBJ.menu.join('\n'));
	process.exit();
}