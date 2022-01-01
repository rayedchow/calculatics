export interface Token {
	type: TokenType
	text: string
	pos: number
}

export enum TokenType {
	Statement,
	Identifier,
	Pointer,
	Equal,
	Number,
	OperationStart,
	OperationEnd,
	Operator,
	EOL
}