import {
	BadRequestException,
	ValidationPipe,
	VersioningType,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	// Create a instance of the application
	const app = await NestFactory.create(AppModule);

	// Enable CORS
	app.enableCors();

	// Set the global prefix to (/api/)
	app.setGlobalPrefix("api");

	// Enable versioning with URI (/v1/)
	app.enableVersioning({
		type: VersioningType.URI,
	});

	// Apply global validation pipe with custom exception handling
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			exceptionFactory(errors) {
				return new BadRequestException({
					error_code: "BAD_REQUEST",
					error_description: "Invalid request body",
					errors: errors.map((error) => ({
						field: error.property,
						constraints: error.constraints,
					})),
				});
			},
		}),
	);

	// Create the Swagger document
	const config = new DocumentBuilder()
		.setTitle("Weesu API Gateway")
		.setDescription("The Weesu Test Interview API Gateway")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);

	// Setup the Swagger UI
	SwaggerModule.setup("docs", app, document, {
		jsonDocumentUrl: "/docs-json",
	});

	// Start the application
	await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
