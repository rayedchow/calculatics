import { Token, TokenType } from '../../@types/Token';
import { handleError } from '../errorHandler';

export const lex = (charSequence: string[]) => {

	const tokens: Token[] = [];
	let currToken = '';
	let numToken = '';

	let pos = 0;
	let line = 0;
	let linePos = 0;

	for(const char of charSequence) {
		currToken += char;

		if((isNaN(+currToken)) && (numToken !== '')) {
			tokens.push({
				type: TokenType.Number,
				text: numToken,
				pos: pos-numToken.length
			});
			numToken = '';
		}

		if(currToken === 'ret') {
			tokens.push({
				type: TokenType.Statement,
				text: currToken,
				pos
			});
			currToken = '';
		}

		if(currToken === '->') {
			tokens.push({
				type: TokenType.Pointer,
				text: currToken,
				pos
			});
			currToken = '';
		}

		if((!isNaN(+currToken)) && (currToken !== '')) {
			numToken += currToken;
			currToken = '';
		}

		if(currToken == ';') {
			line++;
			linePos = 0;
			tokens.push({
				type: TokenType.EOL,
				text: currToken,
				pos
			});
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