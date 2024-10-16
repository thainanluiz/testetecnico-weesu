import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RabbitMQService } from "./rabbitmq.service";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: process.env.MERCADO_LIVRE_MICROSERVICE_CLIENT,
				transport: Transport.RMQ,
				options: {
					urls: [process.env.MERCADO_LIVRE_MICROSERVICE_URL],
					queue: process.env.MERCADO_LIVRE_MICROSERVICE_QUEUE,
				},
			},
		]),
	],
	providers: [RabbitMQService],
	exports: [RabbitMQService],
})
export class RabbitMQModule {}
