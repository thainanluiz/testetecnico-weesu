import { HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { MercadoLivreService } from "../api/mercadolivre.service";

@Injectable()
export class CategoriesService {
	constructor(private readonly mercadoLivreService: MercadoLivreService) {}

	// Service method to get categories
	async getCategories() {
		try {
			const categories = await this.mercadoLivreService.getCategories();

			return {
				categories,
			};
		} catch (error) {
			if (error.message) {
				throw new RpcException({
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
					message: error.message,
				});
			}

			throw new RpcException({
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: "Failed to get categories",
			});
		}
	}
}
