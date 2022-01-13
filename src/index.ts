// PRODUCTION CODE:
import { handleArgs } from "./argHandler";
import { performance } from "perf_hooks";

const CLI_ARGS = process.argv.slice(2);
const timer = performance.now();
handleArgs(CLI_ARGS);
const compileTime = performance.now()-timer;
console.log(`${Math.round(compileTime*1000)/1000}ms`);

// TESTING CODE:
// - uses testing library to perform
//	 test cases on .calc files
// import { testLibrary } from "./testHandler";

// testLibrary([
// 	null,
// ]);