import { HttpService } from "@nestjs/axios";
import { HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { ProductSearchDto } from "../products/dto/product-search.dto";

@Injectable()
export class MercadoLivreService {
	constructor(private readonly httpService: HttpService) {}

	// Service method to get categories from the Mercado Livre API
	async getCategories() {
		try {
			const response = await firstValueFrom(
				this.httpService.get(
					`${process.env.MERCADO_LIVRE_API_URL}/${process.env.MERCADO_LIVRE_API_SITE}/categories`,
					{
						headers: {
							"Content-Type": "application/json",
						},
					},
				),
			);

			return response.data;
		} catch (error) {
			if (error.message) {
				throw new RpcException({
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
					message: error.message,
				});
			}

			throw new RpcException({
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: "Internal Server Error",
			});
		}
	}

	// Service method to search products from the Mercado Livre API
	async searchProducts(productSearchDto: ProductSearchDto) {
		try {
			const response = await firstValueFrom(
				this.httpService.get(
					`${process.env.MERCADO_LIVRE_API_URL}/${process.env.MERCADO_LIVRE_API_SITE}/search`,
					{
						params: {
							q: productSearchDto.term,
							category: productSearchDto.categoryId,
							sort: productSearchDto.orderBy,
						},
						headers: {
							"Content-Type": "application/json",
						},
					},
				),
			);

			return response.data;
		} catch (error) {
			if (error.message) {
				throw new RpcException({
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
					message: error.message,
				});
			}

			throw new RpcException({
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: "Internal Server Error",
			});
		}
	}
}
