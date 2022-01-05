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

export type OperationTree = (number | Operator | VariableIdentifier | OperationTree)[];

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

export interface PriorityOperationItem {
	operation: VariableIdentifier | OperationTree,
	type: 'VARIABLE' | 'OPERATION',
	priority: number
}

// example syntax tree:
// [
//	 {
//		 type: 'RETURN_STATEMENT',
//		 value: 3
//	 }
// ]

// example operation tree:
// for operation: 5+(39-18)/m   NOTE: m=2
// 5+(11)/2 = 5+5.5 = 10.5
// const exampleOperation = {
// 	type: 'RETURN_STATEMENT',
// 	operation: [
// 		5,
// 		'+',
// 		[
// 			39,
// 			'-',
//			18
// 		],
// 		'/',
// 		{
// 			identifier: 'm'
// 		}
// 	]
// }

// OPERATION PRIORITIES (similar to PEMDAS)
// 1 - Variables
// 2 - Operations (())
// 3 - Exponents (^)
// 4 - Multiplication & Divison (* & /)
// 5 - Addition & Subtraction (+ & -)