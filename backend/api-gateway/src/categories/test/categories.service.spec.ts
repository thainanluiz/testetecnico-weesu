import { HttpException, HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { RabbitMQService } from "../../rabbitmq/rabbitmq.service";
import { CategoriesService } from "../categories.service";

describe("CategoriesService", () => {
	let service: CategoriesService;
	let rabbitMQService: RabbitMQService;

	// Categories mock data
	const mockCategories = {
		categories: [
			{ id: "MLB5672", name: "Acessórios para Veículos" },
			{ id: "MLB271599", name: "Agro" },
		],
	};

	// Mocked RabbitMQService
	const rabbitMQServiceMock = {
		sendMicroserviceMessage: jest.fn(),
	};

	// Create the service and RabbitMQService instances before each test
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CategoriesService,
				{ provide: RabbitMQService, useValue: rabbitMQServiceMock },
			],
		}).compile();

		service = module.get<CategoriesService>(CategoriesService);
		rabbitMQService = module.get<RabbitMQService>(RabbitMQService);
	});

	// Test if the service is defined
	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	// Test if the RabbitMQService is defined
	it("should be defined", () => {
		expect(rabbitMQService).toBeDefined();
	});

	// Test the getCategories method
	it("should get categories from microservice", async () => {
		rabbitMQServiceMock.sendMicroserviceMessage.mockResolvedValue(
			mockCategories,
		);

		const result = await service.getCategories();

		await expect(result).toEqual(mockCategories);
		await expect(
			rabbitMQServiceMock.sendMicroserviceMessage,
		).toHaveBeenCalledWith("get_categories", {});
	});

	// Test the getCategories method with empty categories
	it("should throw an HttpException if the microservice fails", async () => {
		const httpException = new HttpException(
			"Internal Server Error",
			HttpStatus.INTERNAL_SERVER_ERROR,
		);

		rabbitMQServiceMock.sendMicroserviceMessage.mockRejectedValue(
			httpException,
		);

		await expect(service.getCategories()).rejects.toThrow(HttpException);
	});
});
