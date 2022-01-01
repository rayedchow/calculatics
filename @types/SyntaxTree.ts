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

type Operation = (number | Operator | Operation | VariableIdentifier)[]

interface VariableIdentifier {
	identifier: string
}

export enum Operator {
	Add,
	Subtract,
	Multiply,
	Divide
}

export const OPERATORS = [
	'+',
	'-',
	'*',
	'/'
];

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
// 		Operator.Add,
// 		[
// 			39,
// 			Operator.Subtract
// 		],
// 		Operator.Divide,
// 		{
// 			identifier: 'm'
// 		}
// 	]
// }