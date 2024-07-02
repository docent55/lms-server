import { Express, Request, Response } from 'express';
import { ISwaggerService } from './swagger.service.interface';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class SwaggerService implements ISwaggerService {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	init(app: Express) {
		const jsDocOption: swaggerJsdoc.Options = {
			definition: {
				openapi: '3.0.0',
				info: {
					title: 'REST API Docs',
					version: '0.1',
				},
				components: {
					securitySchemes: {
						bearerAuth: {
							type: 'http',
							scheme: 'bearer',
							bearerFormat: 'JWT',
						},
					},
				},
				security: [
					{
						bearerAuth: [],
					},
				],
			},
			apis: ['./src/users/*.ts', './src/users/dto/*.ts'],
		};

		const swaggerSpec = swaggerJsdoc(jsDocOption);

		const options = {
			explorer: true,
		};
		app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));

		app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

		app.get('/docs.json', (req: Request, res: Response) => {
			res.setHeader('Content-Type', 'application/json');
			res.send(swaggerSpec);
		});

		this.logger.log('[SwaggerService] Swagger is started');
	}
}
