import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class RabbitMQService {
	constructor(
		@Inject(process.env.MERCADO_LIVRE_MICROSERVICE_CLIENT)
		private mercadoLivreClient: ClientProxy,
	) {}

	// This method sends a message to the microservice
	async sendMicroserviceMessage(pattern: string, data: any) {
		try {
			return this.mercadoLivreClient.send(pattern, data);
		} catch (error) {
			// If we have an HttpException, we throw it
			if (error instanceof HttpException) {
				throw error;
			}

			// If not, we throw a generic HttpException
			throw new HttpException(
				"Internal Server Error",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	// This method emits an event to the microservice
	async emitMicroserviceEvent(pattern: string, data: any) {
		try {
			return this.mercadoLivreClient.emit(pattern, data);
		} catch (error) {
			// If we have an HttpException, we throw it
			if (error instanceof HttpException) {
				throw error;
			}

			// If not, we throw a generic HttpException
			throw new HttpException(
				"Internal Server Error",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
