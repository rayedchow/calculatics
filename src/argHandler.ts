import { Config } from '../@types/Config';
import readFile from './interpreter/fileReader';
import { lex } from './interpreter/Lexer';

export const handleArgs = (args) => {
	// non-arg CLI menu
	if(args.length == 1) {
		console.log(Config.menu.join('\n'));
		process.exit();
	}

	// parsing file argument
	if(args[1] == '-f') {
		if(args.length == 2) {
			console.log('No file location provided (provide after -f arg)');
			process.exit();
		}

		const fileDir = `${args[0]}/${args[2]}`;
		const fileContent = readFile(fileDir);
		const tokens = lex(fileContent.split(''));
	}
}