import { Config } from '../@types/Config';
import { compile } from './compiler/compile'

// made for CLI (prod.)
export const handleArgs = (args: string[]) => {
	// non-arg CLI menu
	if(args.length == 0) {
		console.log(Config.menu.join('\n'));
		process.exit();
	}

	// parsing file argument
	if(args[0] == '-f') {
		if(args.length == 1) {
			console.log('No file location provided (provide after -f arg)');
			process.exit();
		}

		// gets file directory and compiles code
		const fileDir = `${process.cwd()}/${args[1]}`;
		const compileData = compile(fileDir);

		// console.log(compileData);
	}
}