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

			// Map the products
			const products = response.data.results.map((product) => ({
				id: product.id,
				title: product.title,
				price: product.price,
				original_price: product.original_price ?? null,
				thumbnail: product.thumbnail,
				seller: {
					id: product.seller.id,
					nickname: product.seller.nickname,
					official_store_name: product.official_store_name ?? null,
				},
				available_quantity: product.available_quantity,
				condition: product.condition,
				installments: product.installments
					? {
							quantity: product.installments.quantity,
							amount: product.installments.amount,
							rate: product.installments.rate,
						}
					: null,
				free_shipping: product.shipping?.free_shipping ?? false,
				permalink: product.permalink,
			}));

			// Return the product list
			return {
				products: products,
				total: response.data.paging.total,
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
