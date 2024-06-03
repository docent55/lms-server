export class ArticleEntity {
	constructor(
		private readonly _content: string,
		private readonly _author: number,
	) {}

	get content() {
		return this._content;
	}

	get author() {
		return this._author;
	}
}
