import { SyntaxBranch } from "../../@types/SyntaxTree";

// ---- The Interpreter ----
// The last section of the Calculatics Compiler
// - Loops and interprets the Abstract SyntaxTree
// - Executes instructions and finds errors in AST
export const interpret = (syntaxTree: SyntaxBranch[]) => {

	for(const branch of syntaxTree) {
		
		switch(branch.type) {

			case 'RETURN_STATEMENT':
				if(branch.value) console.log(branch.value);
				return;
			case 'LOG_STATEMENT':
				if(branch.value) console.log(branch.value);
				break;
			case 'VARIABLE_STATEMENT':
				if((branch.identifier) && (branch.value)) console.log(`${branch.identifier}=${branch.value}`);
				break;

			default:
				break;
		}

	}

}