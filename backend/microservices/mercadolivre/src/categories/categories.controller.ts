import { Controller, HttpStatus } from "@nestjs/common";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { CategoriesService } from "./categories.service";

@Controller()
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	// Message pattern to search categories
	@MessagePattern("search_categories")
	searchCategories() {
		try {
			// Call the searchCategories method from the CategoriesService
			return this.categoriesService.searchCategories();
		} catch (error) {
			// Throw a RpcException if we have an error
			throw new RpcException({
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: "Internal Server Error",
			});
		}
	}
}
