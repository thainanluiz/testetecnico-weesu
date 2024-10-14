import { HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { MercadoLivreService } from "src/api/mercadolivre.service";
import { ProductSearchDto } from "./dto/product-search.dto";

@Injectable()
export class ProductsService {
	constructor(private readonly mercadoLivreService: MercadoLivreService) {}

	// Method to search products
	async searchProducts(productSearchDto: ProductSearchDto) {
		try {
			const response =
				await this.mercadoLivreService.searchProducts(productSearchDto);

			// Map the products to a new array with minified data
			const products = response.results.map((product) => ({
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

			return {
				products: products,
				total: response.paging.total,
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
				error: "Failed to search products",
			});
		}
	}
}
