import { Scope, SyntaxBranch } from "../../@types/SyntaxTree";

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
		else if(branch.identifier) console.log(identifierScope.global[branch.identifier].value);
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
					identifierScope.global[branch.identifier].value = branch.value;
				break;

			default:
				break;
		}

	}

}