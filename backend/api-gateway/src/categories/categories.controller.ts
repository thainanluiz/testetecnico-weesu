import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoriesService } from "./categories.service";

@Controller({
	version: "1",
	path: "categories",
})
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	// Endpoint to get categories
	@ApiTags("categories")
	@ApiResponse({
		status: 200,
		description: "The categories were successfully found.",
	})
	@ApiResponse({
		status: 500,
		description: "An internal server error occurred.",
	})
	@Get()
	async getCategories() {
		try {
			return this.categoriesService.getCategories();
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
