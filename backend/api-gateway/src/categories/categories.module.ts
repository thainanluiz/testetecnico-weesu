import { Module } from "@nestjs/common";
import { RabbitMQModule } from "../rabbitmq/rabbitmq.module";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";

@Module({
	imports: [RabbitMQModule],
	controllers: [CategoriesController],
	providers: [CategoriesService],
})
export class CategoriesModule {}
