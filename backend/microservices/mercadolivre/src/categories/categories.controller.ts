import { Controller, HttpStatus } from "@nestjs/common";
import { MessagePattern, RpcException } from "@nestjs/microservices";
import { CategoriesService } from "./categories.service";

@Controller()
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	// Controller message pattern method to get categories
	@MessagePattern("get_categories")
	getCategories() {
		try {
			return this.categoriesService.getCategories();
		} catch (error) {
			// Throw a RpcException if we have an error
			throw new RpcException({
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: error.message || "Internal Server Error",
			});
		}
	}
}
