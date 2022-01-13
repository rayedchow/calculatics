import { OperationTree, Operator, OPERATORS, SyntaxBranch } from "../../@types/SyntaxTree";
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

	for(let i = 0; i < tokens.length; i++) {
		const token = tokens[i];

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
				} else if(currBranch.operation)
					currBranch.operation.push({
						identifier: token.text
					});
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
				else if(currBranch.operation) currBranch.operation.push(Number(token.text));
				else handleError('invalid number token', line+1, -1);
				break;
			
			case TokenType.OperationStart:
				if((expStage >= 2) && (currBranch.type)) {
					const nestedOperation = parseOperationTokens(tokens.slice(i+1), line);
					currBranch.operation = nestedOperation.tree;
					i=tokens.indexOf(nestedOperation.lastToken);
					expStage++;
				}
				else handleError('invalid operation start token', line+1, -1);
				break;
			
			case TokenType.EOL:
				line++;
				if((currBranch.type) && (currBranch.value || currBranch.identifier || currBranch.operation)) {
					syntaxTree.push({...currBranch, line});
					currBranch = {};
					expStage = 0;
				}
				else handleError('invalid EOL token', line+1, -1);
				break;

			default:
				handleError('invalid operation in parser', line+1, -1);
				break;
		}

	}

	return syntaxTree;
}

const parseOperationTokens = (tokens: Token[], line: number): { tree: OperationTree, lastToken: Token } => {

	const operationTree: OperationTree = [];
	let lastToken: Token;

	for(let i = 0; i < tokens.length; i++) {
		const token = tokens[i];

		switch(token.type) {

			case TokenType.OperationStart:
				const nestedOperation = parseOperationTokens(tokens.slice(i+1), line);
				operationTree.push(nestedOperation.tree);
				i=tokens.indexOf(nestedOperation.lastToken);
				lastToken = nestedOperation.lastToken;
				break;
			
			case TokenType.OperationEnd:
				lastToken = token;
				return {
					tree: operationTree,
					lastToken
				};
			
			case TokenType.Number:
				lastToken = token;
				operationTree.push(Number(token.text));
				break;
			
			case TokenType.Identifier:
				lastToken = token;
				operationTree.push({ identifier: token.text });
				break;
			
			case TokenType.Operator:
				lastToken = token;
				operationTree.push(token.text as Operator);
				break;

			default:
				handleError('invalid operation in parser', line+1, -1);
				break;
		}
	}

	return handleError('unfinished operation tree; no EOO', -1, -1);
}