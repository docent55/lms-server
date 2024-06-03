import { inject, injectable } from 'inversify';
import { IArticleRepository } from './article.repository.interface';
import { ArticleEntity } from './article.entity';
import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../types';

@injectable()
export class ArticleRepository implements IArticleRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ author, content }: ArticleEntity) {
		return this.prismaService.client.articleModel.create({
			data: {
				content,
				userModelId: author,
			},
		});
	}

	async getArticles(params: { page: string }) {
		const { page } = params;
		const size = 10;

		const count = await this.prismaService.client.articleModel.count();

		return this.prismaService.client.articleModel.findMany({
			relationLoadStrategy: 'join',
			include: {
				author: true,
			},
			skip: (Number(page) - 1) * size,
			take: size,
		});
	}
}
