import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
	BadRequestException,
	ValidationPipe,
	VersioningType,
} from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();

	app.setGlobalPrefix("api");

	app.enableVersioning({
		type: VersioningType.URI,
	});

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

	const config = new DocumentBuilder()
		.setTitle("Weesu API Gateway")
		.setDescription("The Weesu Test Interview API Gateway")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("docs", app, document, {
		jsonDocumentUrl: "/docs-json",
	});

	await app.listen(3000);
}
bootstrap();
