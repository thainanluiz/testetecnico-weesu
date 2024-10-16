import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Test, TestingModule } from "@nestjs/testing";
import { MercadoLivreService } from "../../api/mercadolivre.service";
import { CategoriesService } from "../categories.service";

describe("CategoriesService", () => {
	let service: CategoriesService;
	let mercadoLivreService: MercadoLivreService;

	// Categories mock data
	const mockCategoriesResponse = {
		categories: [
			{ id: "MLB5672", name: "Eletrônicos" },
			{ id: "MLB5673", name: "Roupas" },
		],
	};

	// Mocked MercadoLivreService
	const mercadoLivreServiceMock = {
		getCategories: jest.fn().mockResolvedValue(mockCategoriesResponse),
	};

	// Create the service and MercadoLivreService instances before each test
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CategoriesService,
				{ provide: MercadoLivreService, useValue: mercadoLivreServiceMock },
			],
		}).compile();

		service = module.get<CategoriesService>(CategoriesService);
		mercadoLivreService = module.get<MercadoLivreService>(MercadoLivreService);
	});

	// Test if the service is defined
	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	// Test if the MercadoLivreService is defined
	it("should be defined", () => {
		expect(mercadoLivreService).toBeDefined();
	});

	// Test the getCategories method
	it("should get categories successfully", async () => {
		const result = (await service.getCategories()).categories;

		await expect(result).toEqual(mockCategoriesResponse);
		await expect(mercadoLivreServiceMock.getCategories).toHaveBeenCalled();
	});

	// Test the getCategories method with an empty response
	it("should throw an RpcException if the microservice fails", async () => {
		const rpcException = new RpcException({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: "Internal Server Error",
		});

		mercadoLivreServiceMock.getCategories.mockRejectedValue(rpcException);

		await expect(service.getCategories()).rejects.toThrow(rpcException);
	});
});
