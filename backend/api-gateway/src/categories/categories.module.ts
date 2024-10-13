import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "MERCADOLIVRE_MICROSERVICE",
				transport: Transport.RMQ,
				options: {
					urls: ["amqp://localhost:5672"],
					queue: "main_queue",
				},
			},
		]),
	],
	controllers: [CategoriesController],
	providers: [CategoriesService],
})
export class CategoriesModule {}
