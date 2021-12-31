// abstract syntax tree
// formed by parser and used by interpreter

export type SyntaxBranch = ReturnStatement | VariableStatement | LogStatement;

interface ReturnStatement {
	type?: 'RETURN_STATEMENT'
	value?: number
	operation?: OperationTree
}

interface LogStatement {
	type?: 'LOG_STATEMENT'
	value?: number
	operation?: OperationTree
}

interface VariableStatement {
	type?: 'VARIABLE_STATEMENT'
	identifier?: string
	value?: number | OperationTree
}

export interface OperationTree {
	values: (number | OperationTree | Identifier)[]
	operator: Operator
}

interface Identifier {
	identifier: string
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