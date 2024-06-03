import { Express } from 'express';

export interface ISwaggerService {
	init: (app: Express) => void;
}
