import { readFile } from "./interpreter/fileReader";
import { lex } from "./interpreter/Lexer";


export const testLibrary = (test: any[]) => {
	
	for(let i = 1; i < test.length+1; i++) {
		console.log('----------------------------------')
		const PREFIX = `\u001b[33;1mTEST CASE ${i}\u001b[0m`;
		console.log(`${PREFIX} STATUS - TESTING...`);

		const result = testCase(i);

		console.log(`${PREFIX} STATUS - COMPLETED`);
		if(result == test[i-1]) {
			console.log(`${PREFIX} STATUS - \u001b[42;1m\u001b[30mPASS\u001b[0m`);
		} else if(result != test[i-1]) {
			console.log(`${PREFIX} STATUS - \u001b[41;1m\u001b[37mFAIL\u001b[0m`);
			console.log(`${PREFIX} EXPECTED DATA:`);
			console.log(test[i-1]);
			console.log(`${PREFIX} RESULTING DATA:`);
			console.log(result);
		}

		console.log('----------------------------------')
	}

	

}

const testCase = (caseNum: number) => {
	let result: any;
	// switch(caseNum) {

	// 	case 1:
	// 		// TEST CASE 1
	// 		console.log(process.argv);
	// 		result = 15*3;
	// 		break;

	// 	case 2:
	// 		// TEST CASE 2
	// 		const file = readFile(`${process.cwd()}/test/case-2.calc`);
	// 		const tokens = lex(file.split(''));
	// 		result = tokens;
	// 		break;
		
	// 	default:
	// 		break;

	// }

	const file = readFile(`${process.cwd()}/test/case-${caseNum}.calc`);
	const tokens = lex(file.split(''));

	return tokens;
}