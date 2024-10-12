import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ProductSearchDto } from "./dto/product-search.dto";
import { firstValueFrom } from "rxjs";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ProductsService {
	constructor(private readonly httpService: HttpService) {}

	// Method to search products
	async searchProducts(productSearchDto: ProductSearchDto) {
		try {
			// Call the Mercado Livre API
			const response = await firstValueFrom(
				this.httpService.get("https://api.mercadolibre.com/sites/MLB/search", {
					params: {
						q: productSearchDto.term,
						category: productSearchDto.categoryId,
						sort: productSearchDto.orderBy,
					},
					headers: {
						"Content-Type": "application/json",
					},
				}),
			);

			// Map the products to a simplify the response
			const products = response.data.results.map((product) => ({
				id: product.id,
				title: product.title,
				price: product.price,
				thumbnail: product.thumbnail,
			}));

			// Return the products
			return products;
		} catch (error) {
			// If we have an error, we throw a RpcException
			throw new RpcException({
				status: error.response.status,
				error: error.response.statusText,
			});
		}
	}
}
