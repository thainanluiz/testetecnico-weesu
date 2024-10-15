import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "../products.controller";
import { ProductsService } from "../products.service";
import { ProductSearchDto } from "../dto/product-search.dto";
import { HttpException, HttpStatus } from "@nestjs/common";

describe("ProductsController", () => {
	let controller: ProductsController;
	let service: ProductsService;

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
	const productSearchDto: ProductSearchDto = {
		term: "tv",
		categoryId: "MLB1051",
		orderBy: "price_asc",
	};

	// Mocked ProductsService
	const productsServiceMock = {
		searchProducts: jest.fn(),
	};

	// Create the controller and service instances before each test
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductsController],
			providers: [{ provide: ProductsService, useValue: productsServiceMock }],
		}).compile();

		controller = module.get<ProductsController>(ProductsController);
		service = module.get<ProductsService>(ProductsService);
	});

	// Test if the controller is defined
	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	// Test if the service is defined
	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	// Test the searchProducts method
	it("should search products successfully", async () => {
		productsServiceMock.searchProducts.mockResolvedValue(mockProductsResponse);

		const result = await controller.searchProducts(productSearchDto);

		await expect(result).toEqual(mockProductsResponse);
		await expect(service.searchProducts).toHaveBeenCalledWith(productSearchDto);
	});

	// Test the searchProducts method with empty products
	it("should throw an HttpException if the service fails", async () => {
		const httpException = new HttpException(
			"Internal Server Error",
			HttpStatus.INTERNAL_SERVER_ERROR,
		);

		productsServiceMock.searchProducts.mockRejectedValue(httpException);

		await expect(controller.searchProducts(productSearchDto)).rejects.toThrow(
			HttpException,
		);
	});
});
