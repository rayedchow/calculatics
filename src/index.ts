// import { handleArgs } from "./argHandler";
import { testLibrary } from "./testHandler";

// PRODUCTION CODE:
// const CLI_ARGS = process.argv.slice(2);
// handleArgs(CLI_ARGS);

// TESTING CODE:
// - uses testing library to perform
//	 test cases on .calc files
testLibrary([
	null,
	null
]);