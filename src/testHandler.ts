export const testLibrary = (test: any[]) => {
	
	for(let i = 1; i < test.length+1; i++) {
		console.log('----------------------------------')
		const PREFIX = `\u001b[33;1mTEST CASE ${i}\u001b[0m`;
		console.log(`${PREFIX} STATUS - TESTING...`);

		const result = testCase(i);

		let resultStatus = '\u001b[41;1m\u001b[37mFAIL';
		if(result == test[i-1]) {
			resultStatus = '\u001b[42;1m\u001b[30mPASS';
		}

		console.log(`${PREFIX} STATUS - COMPLETED`);
		console.log(`${PREFIX} RESULT - ${resultStatus}\u001b[0m`);
		console.log('----------------------------------')
	}

	

}

const testCase = (caseNum: number) => {
	let result: any;
	switch(caseNum) {

		case 1:
			// TEST CASE 1

			result = 15*3;
			break;

		case 2:
			// TEST CASE 2
			
			result = 18*2;
			break;
		
		default:
			break;

	}
	return result;
}