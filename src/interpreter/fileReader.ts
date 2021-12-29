import { readFileSync } from 'fs';

const readFile = (dir: string) => {
	try {
		const data = readFileSync(dir, 'utf-8');
		return data;
	} catch(err) {
		return 'PARSING FILE ERROR';
	}
}

export default readFile;