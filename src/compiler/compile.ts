import { readFile } from "./fileReader";
import { interpret } from "./Interpreter";
import { lex } from "./Lexer";
import { parse } from "./Parser";

export const compile = (fileDir: string) => {

	// reads file from fileDir param
	// also removes all whitespace including line breaks
	const file = readFile(fileDir);

	// uses the Lexer compile procedure
	// reads characters and forms tokens
	const tokens = lex(file.split(''));

	// uses the tokens to create an AST
	// *** (Abstract Syntax Tree) ***
	// using the Parser compile procedure
	const SyntaxTree = parse(tokens);

	// uses the syntax tree to interpret and execute
	// using the Interpreter compile procedure
	interpret(SyntaxTree);
}