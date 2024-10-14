import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RabbitMQService } from "src/rabbitmq/rabbitmq.service";

@Injectable()
export class CategoriesService {
	constructor(private readonly rabbitMQService: RabbitMQService) {}

	// This method sends a message to the microservice to get for categories
	async getCategories() {
		try {
			return this.rabbitMQService.sendMicroserviceMessage("get_categories", {});
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
