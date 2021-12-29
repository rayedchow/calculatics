// import { handleArgs } from "./argHandler";

import { TokenType } from "../@types/Token";
import { testLibrary } from "./testHandler";

// PRODUCTION CODE:
// const CLI_ARGS = process.argv.slice(2);
// handleArgs(CLI_ARGS);

// TESTING CODE:
testLibrary([
	[
		{ type: TokenType.Statement, text: "ret", pos: 0 }
	],
	35
]);