// PRODUCTION CODE:
import { handleArgs } from "./argHandler";

const CLI_ARGS = process.argv.slice(2);
const timer = new Date().getTime();
handleArgs(CLI_ARGS);
console.log((new Date().getTime())-timer);

// TESTING CODE:
// - uses testing library to perform
//	 test cases on .calc files
// import { testLibrary } from "./testHandler";

// testLibrary([
// 	null,
// ]);