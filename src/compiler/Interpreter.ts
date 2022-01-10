import { OperationTree, Operator, Scope, SyntaxBranch } from "../../@types/SyntaxTree";
import { handleError } from "../errorHandler";

const identifierScope: Scope = {
	global: {}
};

// ---- The Interpreter ----
// The last section of the Calculatics Compiler
// - Loops and interprets the Abstract SyntaxTree
// - Executes instructions and finds errors in AST
export const interpret = (syntaxTree: SyntaxBranch[]) => {

	const log = (branch: SyntaxBranch) => {
		if(branch.value) console.log(branch.value);
		else if(branch.identifier) {
			if(!identifierScope.global[branch.identifier]) handleError('invalid log identifier use', branch.line, -1);
			console.log(identifierScope.global[branch.identifier].value);
		} else if(branch.operation) {
			console.log(branch.operation);
		}
		else handleError('unknown log value', branch.line, -1);
	}

	for(const branch of syntaxTree) {
		
		switch(branch.type) {

			case 'RETURN_STATEMENT':
				log(branch);
				return;
			case 'LOG_STATEMENT':
				log(branch);
				break;
			case 'VARIABLE_STATEMENT':
				if((branch.identifier) && (branch.value))
					identifierScope.global[branch.identifier] = { value: branch.value };
				else handleError('unknown variable value', branch.line, -1);
				break;

			default:
				break;
		}

	}

}

const priorityOperation = (operationTree: OperationTree, nested: boolean = false): OperationTree => {
	let operationPriority: OperationTree = [];
	let nestOperator = true;

	for(let i = 0; i < operationTree.length; i++) {
		const operation = operationTree[i];

		if(['*','/'].includes(operation as Operator)) {
			if(!nested) {

				operationPriority.pop();
				const nestedOperation = priorityOperation(
					operationTree.slice(i-1), // getting rest of operation tree
					true
				);
				operationPriority.push(nestedOperation);
				i+=nestedOperation.length-2;
				continue;

			} else if((nested) && (!nestOperator)) {

				// creates nested of nested operation
				const nestedOperation = priorityOperation(
					operationTree.slice(i-1),
					true
				);

				// updates nested sequence
				operationPriority.push(operation, operationTree[i+1]);
				i++;
				continue;

			}
			if(nestOperator) nestOperator = false;
		} if((['+','-'].includes(operation as Operator)) && (nested)) {
			return operationPriority;
		}

		operationPriority.push(operation);

	}

	return operationPriority;
}

const evalOperation = (priorityTree: OperationTree, line: number): number => {

	if(typeof priorityTree[0] !== 'number')
		return handleError('invalid number in operation tree', line, -1);
	let currNum: number = priorityTree[0];
	let currOperator: Operator | null;
	console.log(priorityTree);

	for(let i = 1; i < priorityTree.length; i++) {
		let priorityNode = priorityTree[i];

		// evaluating variable identifiers
		if((typeof priorityNode === 'object') && (!Array.isArray(priorityNode))) {
			const variableObj = identifierScope.global[priorityNode.identifier];
			if(!variableObj) return handleError('invalid identifier in operation tree', line, -1);

			priorityNode = variableObj.value;
		}

		// evaluating nested trees
		else if((typeof priorityNode === 'object') && (Array.isArray(priorityNode))) {
			priorityNode = evalOperation(priorityNode, -1);
		}

		// getting operator
		if(typeof priorityNode === 'string') {
			if(!currNum) return handleError('invalid operator usage in operation tree', line, -1);
			currOperator = priorityNode;
		}

		// getting nums
		if(typeof priorityNode === 'number') {
			if(!currOperator) {
				return handleError('invalid number usage in operation tree', line, -1);
			}

			switch(currOperator) {
				case '+':
					currNum += priorityNode;
					break;
				
				case '-':
					currNum -= priorityNode;
					break;
				
				case '*':
					currNum *= priorityNode;
					break;
				
				case '/':
					currNum /= priorityNode;
					break;

				default:
					break;
			}
			currOperator = null;
		}
	}

	if(currOperator) return handleError('invalid end of operation operator', line, -1);

	return currNum;
}

export const parseOperation = (operationTree: OperationTree, line: number): number => {

	let currOperationTree: OperationTree = [];
	const priorityTree = priorityOperation(operationTree);
	const evaluatedResult = evalOperation(priorityTree, line);

	return evaluatedResult;
}