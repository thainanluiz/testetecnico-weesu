import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesController } from "../categories.controller";
import { CategoriesService } from "../categories.service";
import { HttpException, HttpStatus } from "@nestjs/common";

describe("CategoriesController", () => {
	let controller: CategoriesController;
	let categoriesService: CategoriesService;

	// Categories mock data
	const mockCategories = {
		categories: [
			{ id: "MLB5672", name: "Acessórios para Veículos" },
			{ id: "MLB271599", name: "Agro" },
		],
	};

	// Mocked CategoriesService
	const categoriesServiceMock = {
		getCategories: jest.fn(),
	};

	// Create the controller and service instances before each test
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

	// Test if the service is defined
	it("should be defined", () => {
		expect(categoriesService).toBeDefined();
	});

	// Test the getCategories method
	it("should return categories from service", async () => {
		categoriesServiceMock.getCategories.mockResolvedValue(mockCategories);

		const result = await controller.getCategories();

		await expect(result).toEqual(mockCategories);
		await expect(categoriesServiceMock.getCategories).toHaveBeenCalled();
	});

	// Test the getCategories method with empty categories
	it("should throw an HttpException if the service fails", async () => {
		const httpException = new HttpException(
			"Internal Server Error",
			HttpStatus.INTERNAL_SERVER_ERROR,
		);

		categoriesServiceMock.getCategories.mockRejectedValue(httpException);

		await expect(controller.getCategories()).rejects.toThrow(HttpException);
	});
});
