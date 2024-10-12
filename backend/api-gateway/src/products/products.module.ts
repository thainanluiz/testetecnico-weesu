import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "MERCADOLIVRE_SERVICE",
				transport: Transport.RMQ,
				options: {
					urls: ["amqp://localhost:5672"],
					queue: "products-queue",
				},
			},
		]),
	],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {}
