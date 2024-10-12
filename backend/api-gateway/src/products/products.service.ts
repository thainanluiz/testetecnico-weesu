import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ProductSearchDto } from "./dto/product-search.dto";
import { ProductSearchedEvent } from "./events/product-searched.event";

@Injectable()
export class ProductsService {
	constructor(
		@Inject("MERCADOLIVRE_SERVICE")
		private mercadoLivreClient: ClientProxy,
	) {}

	// This method sends a message to the microservice tosearch for products
	async searchProducts({ term, categoryId, orderBy }: ProductSearchDto) {
		try {
			// Send a message to the microservice
			return this.mercadoLivreClient.send(
				"search_products",
				new ProductSearchedEvent(term, categoryId, orderBy),
			);
		} catch (error) {
			// If we have an HttpException, we throw it
			if (error instanceof HttpException) {
				throw error;
			}

			// If not, we throw a generic HttpException
			throw new HttpException(
				{
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: "Internal Server Error",
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
