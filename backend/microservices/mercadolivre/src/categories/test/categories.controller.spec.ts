import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesController } from "../categories.controller";
import { CategoriesService } from "../categories.service";

describe("CategoriesController", () => {
	let controller: CategoriesController;
	let categoriesService: CategoriesService;

	// Categories mock data
	const mockCategoriesResponse = [
		{ id: "MLB5672", name: "Eletrônicos" },
		{ id: "MLB5673", name: "Roupas" },
	];

	// Mocked CategoriesService
	const categoriesServiceMock = {
		getCategories: jest.fn().mockResolvedValue(mockCategoriesResponse),
	};

	// Create the controller and CategoriesService instances before each test
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CategoriesController],
			providers: [
				{ provide: CategoriesService, useValue: categoriesServiceMock },
			],
		}).compile();

		controller = module.get<CategoriesController>(CategoriesController);
		categoriesService = module.get<CategoriesService>(CategoriesService);
	});

	// Test if the controller is defined
	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	// Test if the CategoriesService is defined
	it("should be defined", () => {
		expect(categoriesService).toBeDefined();
	});

	// Test the getCategories method
	it("should get categories successfully", async () => {
		const result = await controller.getCategories();

		await expect(result).toEqual(mockCategoriesResponse);
		await expect(categoriesServiceMock.getCategories).toHaveBeenCalled();
	});

	// Test the getCategories method with an empty response
	it("should throw an RpcException if the microservice fails", async () => {
		const rpcException = new RpcException({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: "Internal Server Error",
		});

		categoriesServiceMock.getCategories.mockRejectedValue(rpcException);

		await expect(controller.getCategories()).rejects.toThrow(RpcException);
	});
});
