import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Test, TestingModule } from "@nestjs/testing";
import { ProductSearchDto } from "../dto/product-search.dto";
import { ProductsController } from "../products.controller";
import { ProductsService } from "../products.service";

describe("ProductsController", () => {
	let controller: ProductsController;
	let service: ProductsService;

	// DTO for product search
	const searchDto: ProductSearchDto = {
		term: "tv",
		categoryId: "MLB1051",
		orderBy: "price_asc",
	};

	// Mocked ProductsService
	const mockProductsService = {
		searchProducts: jest.fn(),
	};

	// Create the controller and ProductsService instances before
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductsController],
			providers: [
				{
					provide: ProductsService,
					useValue: mockProductsService,
				},
			],
		}).compile();

		controller = module.get<ProductsController>(ProductsController);
		service = module.get<ProductsService>(ProductsService);
	});

	// Test if the controller is defined
	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	// Test if the ProductsService is defined
	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	// Test the searchProducts method
	it("should search products successfully", async () => {
		mockProductsService.searchProducts.mockResolvedValue({});

		const result = await controller.searchProducts(searchDto);

		await expect(result).toEqual({});
		await expect(mockProductsService.searchProducts).toHaveBeenCalledWith(
			searchDto,
		);
	});

	// Test the searchProducts method with empty products
	it("should throw an RpcException if the microservice fails", async () => {
		const rpcException = new RpcException({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: "Internal Server Error",
		});

		mockProductsService.searchProducts.mockRejectedValue(rpcException);

		await expect(controller.searchProducts(searchDto)).rejects.toThrow(
			rpcException,
		);
	});
});
