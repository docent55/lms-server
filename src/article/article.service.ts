import { inject, injectable } from 'inversify';
import { IArticleService } from './article.service.interface';
import { ArticleCreateDto } from './dto/article-create.dto';
import { TYPES } from '../types';
import { IArticleRepository } from './article.repository.interface';
import { ArticleEntity } from './article.entity';

@injectable()
export class ArticleService implements IArticleService {
	constructor(@inject(TYPES.ArticleRepository) private articleRepository: IArticleRepository) {}

	async createArticle({ authorId, content }: ArticleCreateDto) {
		const newArticle = new ArticleEntity(content, authorId);

		return this.articleRepository.create(newArticle);
	}

	async getArticles(params: { page: string }) {
		return this.articleRepository.getArticles(params);
	}
}
