import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class CategoriesService {
	constructor(
		@Inject("MERCADOLIVRE_MICROSERVICE")
		private mercadoLivreClient: ClientProxy,
	) {}

	// This method sends a message to the microservice to search for categories
	async searchCategories() {
		try {
			// Send a message to the microservice
			return this.mercadoLivreClient.send("search_categories", {});
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
