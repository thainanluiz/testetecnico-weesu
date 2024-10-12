import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { BadRequestException, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.RMQ,
			options: {
				urls: ["amqp://localhost:5672"],
				queue: "products-queue",
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
