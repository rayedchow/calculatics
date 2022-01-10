import { OperationTree, Operator, OPERATORS, PriorityOperationItem, Scope, SyntaxBranch } from "../../@types/SyntaxTree";
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
				operationPriority.push(
					priorityOperation(
						operationTree.slice(i-1), // getting rest of operation tree
						true
					)
				);
			} else if((nested) && (!nestOperator)) {

				// creates nested of nested operation
				operationPriority = [
					operationPriority,
					operation,
					priorityOperation(
						operationTree.slice(i-1),
						true
					)
				];

			} if(nestOperator) nestOperator = false;
			continue;
		} if((['+','-'].includes(operation as Operator)) && (nested)) {
			return operationPriority;
		}

		operationPriority.push(operation);

	}

	return operationPriority;
}

export const parseOperation = (operationTree: OperationTree, line: number): OperationTree => {

	let currOperationTree: OperationTree = [];
	const operationPriority = priorityOperation(operationTree);

	// sorting by priority
	return operationPriority;
}