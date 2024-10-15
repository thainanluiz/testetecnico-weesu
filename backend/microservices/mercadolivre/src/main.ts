import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
	// Create a instance of microservice
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.RMQ,
			options: {
				urls: ["amqp://guest:guest@localhost:5672"],
				queue: "main_queue",
			},
		},
	);

	// Apply global validation pipe with custom exception handling
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			exceptionFactory(errors) {
				return new BadRequestException({
					error_code: "INVALID_DATA",
					error_description: "Validation failed",
					errors: errors.map((error) => ({
						field: error.property,
						constraints: error.constraints,
					})),
				});
			},
		}),
	);

	// Start the application
	await app.listen();
}
bootstrap();
