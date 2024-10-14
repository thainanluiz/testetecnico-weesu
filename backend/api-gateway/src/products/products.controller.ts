import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Query,
} from "@nestjs/common";
import { ProductSearchDto } from "./dto/product-search.dto";
import { ProductsService } from "./products.service";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller({
	version: "1",
	path: "products",
})
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	// Endpoint to search products
	@ApiTags("products")
	@ApiQuery({
		name: "term",
		required: true,
		type: String,
		description: "The term to search for a product at Mercado Livre",
	})
	@ApiQuery({
		name: "categoryId",
		required: false,
		type: String,
		description: "The category to search for a product at Mercado Livre",
	})
	@ApiQuery({
		name: "orderBy",
		required: false,
		type: String,
		description: "The order to search for a product at Mercado Livre",
	})
	@ApiResponse({
		status: 200,
		description: "The products were successfully found.",
	})
	@ApiResponse({
		status: 400,
		description: "The request is invalid.",
	})
	@ApiResponse({
		status: 500,
		description: "An internal server error occurred.",
	})
	@Get("search")
	async searchProducts(@Query() productSearchDto: ProductSearchDto) {
		try {
			return this.productsService.searchProducts(productSearchDto);
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
