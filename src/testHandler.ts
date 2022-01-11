import { OperationTree } from "../@types/SyntaxTree";
import { compile } from "./compiler/compile";
import { parseOperation } from "./compiler/Interpreter";

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

	// reads test case file & compiles
	// const fileDir = `${process.cwd()}/test/case-${caseNum}.calc`;
	// const compileData = compile(fileDir);
	// return compileData;

	// tests operation tree sequence
	const testTree: OperationTree = [
		[
			3,
			'+',
			2
		],
		'*',
		[
			2,
			'+',
			5
		]
	]; // (3+2)*(2+5)

	return parseOperation(testTree, -1);
}