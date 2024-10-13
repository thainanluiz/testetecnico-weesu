import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller({
	version: "1",
	path: "categories",
})
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	// Endpoint to search categories
	@ApiTags("categories")
	@ApiResponse({
		status: 200,
		description: "The categories were successfully found.",
	})
	@Get()
	async searchCategories() {
		try {
			// Call the searchCategories method from the CategoriesService
			return this.categoriesService.searchCategories();
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
