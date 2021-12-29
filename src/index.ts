import { Config } from '../@types/Config';
import ConfigData from '../config.json';
import readFile from './interpreter/fileReader';
import { lex } from './interpreter/Lexer';

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

	const fileDir = `${CLI_ARGS[0]}/${CLI_ARGS[2]}`;
	const fileContent = readFile(fileDir);
	console.log(lex(fileContent.split('')));
	// console.log(fileContent);
}