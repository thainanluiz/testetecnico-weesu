import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class CategoriesService {
	constructor(private readonly httpService: HttpService) {}

	// Method to search categories
	async searchCategories() {
		try {
			// Call the Mercado Livre API
			const response = await firstValueFrom(
				this.httpService.get(
					"https://api.mercadolibre.com/sites/MLB/categories",
					{
						headers: {
							"Content-Type": "application/json",
						},
					},
				),
			);

			// Map the categories
			const categories = response.data;

			// Return the categories list
			return {
				categories: categories,
			};
		} catch (error) {
			// If we have an error, we throw a RpcException
			throw new RpcException({
				status: error.response.status,
				error: error.response.statusText,
			});
		}
	}
}
