import { Controller, HttpStatus } from "@nestjs/common";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { ProductsService } from "./products.service";
import { ProductSearchDto } from "./dto/product-search.dto";

@Controller()
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	// Message pattern to search products
	@MessagePattern("search_products")
	searchProducts(@Payload() productSearchDto: ProductSearchDto) {
		try {
			// Call the searchProducts method from the ProductsService
			return this.productsService.searchProducts(productSearchDto);
		} catch (error) {
			// Throw a RpcException if we have an error
			throw new RpcException({
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: "Internal Server Error",
			});
		}
	}
}
