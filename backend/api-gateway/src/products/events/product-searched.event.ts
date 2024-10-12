export class ProductSearchedEvent {
	constructor(
		public readonly term: string,
		public readonly categoryId: string,
		public readonly orderBy: string,
	) {}

	// Default toString method when the object is emitted to the microservice
	toString(): string {
		return JSON.stringify({
			term: this.term,
			categoryId: this.categoryId,
			orderBy: this.orderBy,
		});
	}
}
