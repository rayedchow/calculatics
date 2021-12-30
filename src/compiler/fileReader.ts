import { readFileSync } from 'fs';
import { handleError } from '../errorHandler';

export const readFile = (dir: string) => {

	if(!dir.endsWith('.calc')) handleError('invalid file', -1, -1);

	try {
		// reads file using fs
		// also removes all whitespace and line breaks
		const data = readFileSync(dir, 'utf-8')
			.replace(/\s/g, '')
			.replace(/(\r\n|\n|\r)/gm, '');
		return data;
	} catch(err) {
		handleError('invalid file', -1, -1);
	}
}