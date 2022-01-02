// abstract syntax tree
// formed by parser and used by interpreter

export type SyntaxBranch = BasicStatement;

export interface Scope {
	global: {
		[identifier: string]: VariableData
	}
	// [scope: string]: string
}

interface VariableData {
	value: number
}

interface BasicStatement {
	type?: 'RETURN_STATEMENT' | 'LOG_STATEMENT' | 'VARIABLE_STATEMENT'
	value?: number
	identifier?: string
	operation?: Operation
	line?: number
}

type Operation = (number | Operator | VariableIdentifier)[];

interface VariableIdentifier {
	identifier: string
}

export type Operator = typeof OPERATORS[number];

export const OPERATORS = [
	'+',
	'-',
	'*',
	'/'
] as const;

// example syntax tree:
// [
//	 {
//		 type: 'RETURN_STATEMENT',
//		 value: 3
//	 }
// ]

// example operation tree:
// for operation: 5+(39-18)/m
// const exampleOperation = {
// 	type: 'RETURN_STATEMENT',
// 	operation: [
// 		5,
// 		'+',
// 		[
// 			39,
// 			'-'
// 		],
// 		'/',
// 		{
// 			identifier: 'm'
// 		}
// 	]
// }