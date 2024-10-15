import { Test, TestingModule } from "@nestjs/testing";
import { ProductsService } from "../products.service";
import { RabbitMQService } from "../../rabbitmq/rabbitmq.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import { ProductSearchDto } from "../dto/product-search.dto";

describe("ProductsService", () => {
	let service: ProductsService;
	let rabbitMQService: RabbitMQService;

	// Products mock data
	const mockProductsResponse = {
		products: [
			{
				id: "MLB3822350769",
				title:
					"Smart Tv LG Led 65  65ur871c0sa Ai Thinq Led 4k 65 100v 240v Preto",
				price: 3269,
				original_price: 5498.34,
				thumbnail:
					"http://http2.mlstatic.com/D_884778-MLU77355786759_062024-I.jpg",
				seller: {
					id: 1917068106,
					nickname: "VIKINGS_DIGITAL",
					official_store_name: "Vikings",
				},
				available_quantity: 500,
				condition: "new",
				installments: {
					quantity: 10,
					amount: 326.9,
					rate: 0,
				},
				free_shipping: true,
				permalink:
					"https://www.mercadolivre.com.br/smart-tv-lg-led-65-65ur871c0sa-ai-thinq-led-4k-65-100v-240v-preto/p/MLB24540517#wid=MLB3822350769&sid=unknown",
			},
		],
	};

	// DTO for product search
	const searchDto: ProductSearchDto = {
		term: "tv",
		categoryId: "MLB1051",
		orderBy: "price_asc",
	};

	// Mocked RabbitMQService
	const rabbitMQServiceMock = {
		sendMicroserviceMessage: jest.fn(),
	};

	// Create the service and RabbitMQService instances before each test
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductsService,
				{ provide: RabbitMQService, useValue: rabbitMQServiceMock },
			],
		}).compile();

		service = module.get<ProductsService>(ProductsService);
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

	// Test the searchProducts method
	it("should search products successfully", async () => {
		rabbitMQServiceMock.sendMicroserviceMessage.mockResolvedValue(
			mockProductsResponse,
		);

		const result = await service.searchProducts(searchDto);

		await expect(result).toEqual(mockProductsResponse);
		await expect(
			rabbitMQServiceMock.sendMicroserviceMessage,
		).toHaveBeenCalledWith("search_products", searchDto);
	});

	// Test the searchProducts method with empty products
	it("should throw an HttpException if the microservice fails", async () => {
		const httpException = new HttpException(
			"Internal Server Error",
			HttpStatus.INTERNAL_SERVER_ERROR,
		);

		rabbitMQServiceMock.sendMicroserviceMessage.mockRejectedValue(
			httpException,
		);

		await expect(service.searchProducts(searchDto)).rejects.toThrow(
			HttpException,
		);
	});
});
