import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RabbitMQService } from "src/rabbitmq/rabbitmq.service";
import { ProductSearchDto } from "./dto/product-search.dto";

@Injectable()
export class ProductsService {
	constructor(private readonly rabbitMQService: RabbitMQService) {}

	// This method sends a message to the microservice to search for products
	async searchProducts({ term, categoryId, orderBy }: ProductSearchDto) {
		try {
			return this.rabbitMQService.sendMicroserviceMessage("search_products", {
				term,
				categoryId,
				orderBy,
			});
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
