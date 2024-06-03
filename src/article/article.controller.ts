import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { IArticleController } from './article.controller.interface';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IArticleService } from './article.service.interface';
import { ArticleCreateDto } from './dto/article-create.dto';
import { ValidateMiddleware } from '../common/validate-middleware';
import { AuthGuard } from '../common/auth.guard';

@injectable()
export class ArticleController extends BaseController implements IArticleController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ArticleService) private articleService: IArticleService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/create',
				method: 'post',
				func: this.create,
				middlewares: [new ValidateMiddleware(ArticleCreateDto)],
			},
			{
				path: '/list',
				method: 'get',
				func: this.getArticles,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	async create(req: Request<object, object, ArticleCreateDto>, res: Response, next: NextFunction) {
		const result = await this.articleService.createArticle(req.body);

		this.ok(res, {});
	}

	async getArticles(req: Request<object, object, object>, res: Response, next: NextFunction) {
		const { page } = req.query as { page: string };

		const result = await this.articleService.getArticles({ page });

		this.ok(res, result);
	}
}
