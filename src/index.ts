import { Config } from '../@types/Config';
import readFile from './interpreter/fileReader';
import { lex } from './interpreter/Lexer';

const CLI_ARGS = process.argv.slice(2);

// non-arg CLI menu
if(CLI_ARGS.length == 1) {
	console.log(Config.menu.join('\n'));
	process.exit();
}

// parsing file argument
if(CLI_ARGS[1] == '-f') {
	if(CLI_ARGS.length == 2) {
		console.log('No file location provided (provide after -f arg)');
		process.exit();
	}

	const fileDir = `${CLI_ARGS[0]}/${CLI_ARGS[2]}`;
	const fileContent = readFile(fileDir);
	const tokens = lex(fileContent.split(''));
}