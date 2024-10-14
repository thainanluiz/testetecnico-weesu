import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RabbitMQService } from "./rabbitmq.service";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "MERCADOLIVRE_MICROSERVICE",
				transport: Transport.RMQ,
				options: {
					urls: ["amqp://guest:guest@localhost:5672"],
					queue: "main_queue",
				},
			},
		]),
	],
	providers: [RabbitMQService],
	exports: [RabbitMQService],
})
export class RabbitMQModule {}
