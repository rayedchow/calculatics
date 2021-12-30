// ---- The Parser ----
// The second section of the Calculatics Compiler
// Loops through tokens and forms the AST struct
// The AST will be later used and interpreted
// *** AST = Abstract Syntax Tree ***

import { SyntaxBranch } from "../../@types/SyntaxTree";
import { Token, TokenType } from "../../@types/Token";

export const parse = (tokens: Token[]) => {
	
	let expStage = 0;
	let currBranch: SyntaxBranch = {};
	// let line = 0;

	const syntaxTree: SyntaxBranch[] = [];

	for(const token of tokens) {

		switch(token.type) {

			case TokenType.Statement:
				if((token.text === 'ret') && (expStage === 0)) {
					currBranch.type = 'RETURN_STATEMENT';
					expStage = 1;
				}
				break;
			
			case TokenType.Pointer:
				if(expStage === 1) expStage = 2;
				break;
			
			case TokenType.Number:
				if((expStage === 2) && (currBranch.type === 'RETURN_STATEMENT')) {
					expStage = 3;
					currBranch.value = Number(token.text);
				}
				break;
			
			case TokenType.EOL:
				if((currBranch.type) && (currBranch.value)) {
					syntaxTree.push(currBranch);
					currBranch = {};
					expStage = 0;
				}
				break;

			default:
				break;
		}

	}

	return syntaxTree;
}