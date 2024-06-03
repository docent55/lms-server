import { IsNumber, IsString } from 'class-validator';

export class ArticleCreateDto {
	@IsNumber()
	authorId: number;

	@IsString()
	content: string;
}
