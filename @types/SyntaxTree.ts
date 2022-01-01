// abstract syntax tree
// formed by parser and used by interpreter

export type SyntaxBranch = ReturnStatement | VariableStatement | LogStatement;

export interface Scope {
	global: {
		[identifier: string]: VariableData
	}
	// [scope: string]: string
}

interface VariableData {
	value: number
}

interface ReturnStatement {
	type?: 'RETURN_STATEMENT'
	value?: number
	operation?: OperationTree
	identifier?: string
}

interface LogStatement {
	type?: 'LOG_STATEMENT'
	value?: number
	operation?: OperationTree
	identifier?: string
}

interface VariableStatement {
	type?: 'VARIABLE_STATEMENT'
	identifier?: string
	value?: number
	operation?: OperationTree
}

export interface OperationTree {
	values: (number | OperationTree | string)[]
	operator: Operator
}

export enum Operator {
	Add,
	Subtract,
	Multiply,
	Divide
}

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