// abstract syntax tree
// formed by parser and used by interpreter

type SyntaxBranch = ReturnStatement | VariableStatement;

interface ReturnStatement {
	// type: 'ReturnStatement'
	value?: number
	operation?: OperationTree
}

interface VariableStatement {
	identifier: string
	value: number | OperationTree
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

export const SyntaxTree: SyntaxBranch[] = [];

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