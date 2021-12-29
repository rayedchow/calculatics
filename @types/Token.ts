export interface Token {
	type: TokenType
	text: string
	pos: number
}

export enum TokenType {
	Statement,
	Pointer,
	Number,
	EOL
}