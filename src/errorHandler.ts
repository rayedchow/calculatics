import { Config } from "../@types/Config";

export const handleError = (errorLog: string, line: number, pos: number) => {

	const errorMessage = Config.error
		.replace(/{ERROR_MESSAGE}/g, errorLog)
		.replace(/{LINE_NUM}/g, line.toString())
		.replace(/{POS_NUM}/g, pos.toString());

	console.error(errorMessage);
	process.exit();

}