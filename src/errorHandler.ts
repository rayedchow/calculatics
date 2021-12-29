import { Config } from "../@types/Config";

export const handleError = (errorLog: string, line: number, pos: number) => {

	const errorMessage = Config.error
		.replace(/{ERROR_MESSAGE}/g, errorLog)
		.replace(/{LINE_NUM}/g, (line+1).toString())
		.replace(/{POS_NUM}/g, (pos+1).toString());

	console.error(errorMessage);
	// process.exit();

}