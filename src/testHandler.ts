import { readFile } from "./compiler/fileReader";
import { lex } from "./compiler/Lexer";
import { parse } from "./compiler/Parser";

// ---- The Calculatics Testing Library ----
// The testing library is used in development
// To test the language's syntax and results
// *** not used in production ***
export const testLibrary = (test: any[]) => {
	
	for(let i = 1; i < test.length+1; i++) {
		console.log('----------------------------------')
		const PREFIX = `\u001b[33;1mTEST CASE ${i}\u001b[0m`;
		console.log(`${PREFIX} STATUS - TESTING...`);

		const result = testCase(i);

		console.log(`${PREFIX} STATUS - COMPLETED`);

		if(test[i-1] === null) {
			console.log(`${PREFIX} STATUS - \u001b[42;1m\u001b[30mPASS\u001b[0m`);
			console.log(`${PREFIX} RESULTING DATA:`);
			console.log(result);
		}

		else if(result == test[i-1]) {
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

	// reads test case files
	const file = readFile(`${process.cwd()}/test/case-${caseNum}.calc`);
	const tokens = lex(file.split(''));
	const SyntaxTree = parse(tokens);

	return SyntaxTree;
}