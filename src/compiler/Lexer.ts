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
	let lastToken: Token;

	let pos = 0;
	let line = 0;
	let linePos = 0;

	for(const char of charSequence) {
		currToken += char;

		if(((isNaN(+currToken)) && (numToken !== '')) && ((currToken !== 'e') && ((currToken !== '+') && (!numToken.endsWith('e'))) && (currToken !== '.'))) {
			lastToken = {
				type: TokenType.Number,
				text: numToken,
				pos: pos-numToken.length
			};
			tokens.push(lastToken);
			numToken = '';
		}

		if(
			(currToken === 'ret') ||
			(currToken === 'log') ||
			(currToken === 'var')
		) {
			if((lastToken) && (lastToken.type !== TokenType.EOL)) handleError('invalid statement token', line+1, linePos+1);
			lastToken = {
				type: TokenType.Statement,
				text: currToken,
				pos
			};
			tokens.push(lastToken);
			currToken = '';
		}

		if(currToken === '->') {
			if((lastToken) && (lastToken.type !== TokenType.Statement)) handleError('invalid pointer token', line+1, linePos+1);
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

		pos++;
		linePos++;
	}

	if((currToken !== '') || (numToken !== '')) {
		handleError('invalid EOF expression', line+1, linePos+1);
	}

	return tokens;

}