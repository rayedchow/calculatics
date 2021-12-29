import { readFileSync } from 'fs';
import { handleError } from '../errorHandler';

const readFile = (dir: string) => {

	if(!dir.endsWith('.calc')) handleError('invalid file', -1, -1);

	try {
		const data = readFileSync(dir, 'utf-8');
		return data;
	} catch(err) {
		handleError('invalid file', -1, -1);
	}
}

export default readFile;