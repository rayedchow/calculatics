import { Operator, OPERATORS } from '../../@types/SyntaxTree';
import { Token, TokenType } from '../../@types/Token';
import { handleError } from '../errorHandler';

// ---- The Lexer ----
// The first section of the Calculatics Compiler
// Loops through characters and creates tokens
// These tokens are later used to create a tree
// -- AKA Tokenizer --
export const lex = (charSequence: string[]) => {

	const tokens: Token[] = [];
	let currToken = '';
	let numToken = '';
	let identifierToken = '';
	let lastToken: Token;
	let currOperations = 0;

	let pos = 0;
	let line = 0;
	let linePos = 0;

	for(const char of charSequence) {
		currToken += char;

		if(((isNaN(+currToken)) && (numToken !== '')) && ((currToken !== 'e') && ((currToken !== '+') || (!numToken.endsWith('e'))) && (currToken !== '.'))) {
			lastToken = {
				type: TokenType.Number,
				text: numToken,
				pos: pos-numToken.length
			};
			tokens.push(lastToken);
			numToken = '';
		}

		if((identifierToken !== '') && (/[^a-zA-Z]/.test(currToken))) {
			lastToken = {
				type: TokenType.Identifier,
				text: identifierToken,
				pos: pos-identifierToken.length
			};
			tokens.push(lastToken);
			// identifierToken = '';
			currToken = '';
		}

		if(
			(currToken === 'ret') ||
			(currToken === 'log') ||
			(currToken === 'var')
		) {
			if((lastToken) && (lastToken.type !== TokenType.EOL)) {
				handleError('invalid statement token', line+1, linePos+1);
			}
			lastToken = {
				type: TokenType.Statement,
				text: currToken,
				pos
			};
			tokens.push(lastToken);
			currToken = '';
		}

		if(currToken === '->') {
			if((lastToken) && (lastToken.type !== TokenType.Statement))
				handleError('invalid pointer token', line+1, linePos+1);
			lastToken = {
				type: TokenType.Pointer,
				text: currToken,
				pos
			};
			tokens.push(lastToken);
			currToken = '';
		}

		if(((!isNaN(+currToken)) && (currToken !== '')) || (((currToken === 'e') && (numToken !== '')) || ((currToken === '+') && (numToken.endsWith('e'))))) {
			numToken += currToken;
			currToken = '';
		}

		if(currToken === '=') {
			if((lastToken) && (lastToken.type !== TokenType.Identifier)) handleError('invalid equal token', line+1, linePos+1);
			lastToken = {
				type: TokenType.Equal,
				text: currToken,
				pos
			};
			tokens.push(lastToken);
			currToken = '';
		}

		if(currToken === '(') {
			lastToken = {
				type: TokenType.OperationStart,
				text: currToken,
				pos
			};
			currOperations++;
			tokens.push(lastToken);
			currToken = '';
		}

		if(currToken === ')') {
			lastToken = {
				type: TokenType.OperationEnd,
				text: currToken,
				pos
			};
			currOperations--;
			tokens.push(lastToken);
			currToken = '';
		}

		if((lastToken) && (lastToken.type !== TokenType.Statement) &&
			(OPERATORS.includes(currToken as Operator)) && (!numToken.endsWith('e'))) {
			lastToken = {
				type: TokenType.Operator,
				text: currToken,
				pos
			};
			tokens.push(lastToken);
			currToken = '';
		}

		if(currToken === ';') {
			line++;
			linePos = 0;
			lastToken = {
				type: TokenType.EOL,
				text: currToken,
				pos
			};
			tokens.push(lastToken);
			currToken = '';
		}

		else if((lastToken) && ((lastToken.type === TokenType.Pointer) || (currOperations>0)) && (!/[^a-zA-Z]/.test(currToken))) {
			identifierToken += currToken;
			currToken = '';
		}

		pos++;
		linePos++;
	}

	if((currToken !== '') || (numToken !== '')) {
		console.log(tokens);
		console.log(currToken, numToken);
		handleError('invalid EOF expression', line+1, linePos+1);
	}

	return tokens;

}