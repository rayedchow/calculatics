import { SyntaxBranch } from "../../@types/SyntaxTree";
import { Token, TokenType } from "../../@types/Token";
import { handleError } from "../errorHandler";

// ---- The Parser ----
// The second section of the Calculatics Compiler
// Loops through tokens and forms the AST struct
// The AST will be later used and interpreted
// *** AST = Abstract Syntax Tree ***
export const parse = (tokens: Token[]) => {
	
	let expStage = 0;
	let currBranch: SyntaxBranch = {};
	let line = 0;

	const syntaxTree: SyntaxBranch[] = [];

	for(const token of tokens) {

		switch(token.type) {

			case TokenType.Statement:
				if(token.text === 'ret') {
					currBranch.type = 'RETURN_STATEMENT';
				} else if(token.text === 'log') {
					currBranch.type = 'LOG_STATEMENT';
				} else if(token.text === 'var') {
					currBranch.type = 'VARIABLE_STATEMENT';
				} else handleError('invalid statement', line+1, -1);

				if(expStage === 0) expStage = 1;
				else handleError('invalid expression stage', line+1, -1);
				break;
			
			case TokenType.Identifier:
				if((expStage === 2) && (['VARIABLE_STATEMENT', 'RETURN_STATEMENT', 'LOG_STATEMENT'].includes(currBranch.type))) {
					expStage = 3;
					currBranch.identifier = token.text;
				}
				else handleError('invalid identifier', line+1, -1);
				break;
			
			case TokenType.Pointer:
				if(expStage === 1) expStage = 2;
				else handleError('invalid expression stage (pointer)', line+1, -1);
				break;
			
			case TokenType.Equal:
				if((expStage === 3) && (currBranch.type === 'VARIABLE_STATEMENT')) expStage = 4;
				else handleError('invalid expression stage (equal)', line+1, -1);
				break;
			
			case TokenType.Number:
				if((expStage === 2) && (['RETURN_STATEMENT', 'LOG_STATEMENT'].includes(currBranch.type))) {
					expStage = 3;
					currBranch.value = Number(token.text);
				}
				else if((expStage === 4) && (currBranch.type === 'VARIABLE_STATEMENT')) {
					expStage = 5;
					currBranch.value = Number(token.text);
				}
				else handleError('invalid number token', line+1, -1);
				break;
			
			case TokenType.EOL:
				line++;
				if((currBranch.type) && (currBranch.value || currBranch.identifier || currBranch.operation)) {
					syntaxTree.push({...currBranch, line});
					currBranch = {};
					expStage = 0;
				}
				else handleError('invalid EOL token', line, -1);
				break;

			default:
				break;
		}

	}

	return syntaxTree;
}