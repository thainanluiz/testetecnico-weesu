import { HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { MercadoLivreService } from "src/api/mercadolivre.service";

@Injectable()
export class CategoriesService {
	constructor(private readonly mercadoLivreService: MercadoLivreService) {}

	// Service method to get categories
	async getCategories() {
		try {
			const categories = await this.mercadoLivreService.getCategories();

			return {
				categories: categories,
			};
		} catch (error) {
			if (error.message) {
				throw new RpcException({
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: error.message,
				});
			}

			throw new RpcException({
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: "Failed to get categories",
			});
		}
	}
}
