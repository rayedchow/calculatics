import { readFileSync } from 'fs';
import { handleError } from '../errorHandler';

export const readFile = (dir: string) => {

	if(!dir.endsWith('.calc')) handleError('invalid file', -1, -1);

	try {
		// reads file using fs
		let data = readFileSync(dir, 'utf-8');
		
		// removes all commented lines
		for(const line of data.split('\n')) {
			if(`${line}`.startsWith('#')) data = data.replace(line, '');
		}

		// removes all line breaks/whitespace
		data = data
			.replace(/\s/g, '')
			.replace(/(\r\n|\n|\r)/gm, '');

		return data;

	} catch(err) {
		handleError('invalid file', -1, -1);
	}
}