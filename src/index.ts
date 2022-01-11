// PRODUCTION CODE:
console.time('compiling');
import { handleArgs } from "./argHandler";

const CLI_ARGS = process.argv.slice(2);
handleArgs(CLI_ARGS);
console.timeEnd('compiling');

// TESTING CODE:
// - uses testing library to perform
//	 test cases on .calc files
// import { testLibrary } from "./testHandler";

// testLibrary([
// 	null,
// ]);