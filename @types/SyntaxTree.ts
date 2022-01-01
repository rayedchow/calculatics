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
	operation?: OperationTree
	line?: number
}

export interface OperationTree {
	values?: (number | OperationTree | string)[]
	operator?: Operator
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
// for operation: (5+39)-(18/m)
// {
//		values: [
//	 		{
//	 			values: [
//	 				5,
//	 				39
//	 			],
//	 			operation: 'ADD'
//	 		},
//	 		{
//	 			values: [
//	 				18,
//	 				{
//	 					identifier: 'm'
//	 				}
//	 			],
//	 			operation: 'DIVIDE'
//	 		}
//		],
//		operation: 'SUBTRACT'
// }