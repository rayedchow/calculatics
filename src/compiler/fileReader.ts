import { readFileSync } from 'fs';
import { handleError } from '../errorHandler';

export const readFile = (dir: string) => {

	if(!dir.endsWith('.calc')) handleError('invalid file', -1, -1);

	try {
		// reads file using fs
		// also removes all whitespace
		const data = readFileSync(dir, 'utf-8')
			.replace(/\s/g, '');
		
		// removes all commented lines
		for(const line of data.split('\n')) {
			if(line.startsWith('?')) data.replace(line, '');
		}

		// removes all line breaks and returns
		return data.replace(/(\r\n|\n|\r)/gm, '');;
	} catch(err) {
		handleError('invalid file', -1, -1);
	}
}