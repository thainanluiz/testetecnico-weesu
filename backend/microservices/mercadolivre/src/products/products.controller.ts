import { Controller, HttpStatus } from "@nestjs/common";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { ProductSearchDto } from "./dto/product-search.dto";
import { ProductsService } from "./products.service";

@Controller()
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	// Controller message pattern method to search products
	@MessagePattern("search_products")
	searchProducts(@Payload() productSearchDto: ProductSearchDto) {
		try {
			return this.productsService.searchProducts(productSearchDto);
		} catch (error) {
			// Throw a RpcException if we have an error
			throw new RpcException({
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: error.message || "Internal Server Error",
			});
		}
	}
}
