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

const priorityOperation = (operationTree: OperationTree, line: number): OperationTree => {
	const operationPriority: OperationTree = [];

	for(const operation of operationTree) {
		
		if(typeof operation === 'number') {
			
		}
		if((typeof operation === 'object') && (!Array.isArray(operation))) {
			if(!operation.identifier) handleError('invalid object in operation', line, -1);
			// safe to assume operation is a variable identifier

			operationPriority.push(operation);
		}

	}

	return operationPriority;
}

export const parseOperation = (operationTree: OperationTree, line: number): OperationTree => {

	let currOperationTree: OperationTree = [];
	const operationPriority = priorityOperation(operationTree, line);

	// sorting by priority
	return operationPriority;
}