import ConfigData from '../config.json';

interface ConfigType {
	menu: string[]
	error: string
}

export const Config: ConfigType = ConfigData;