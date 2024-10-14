import { Module } from "@nestjs/common";
import { RabbitMQModule } from "src/rabbitmq/rabbitmq.module";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
	imports: [RabbitMQModule],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {}
