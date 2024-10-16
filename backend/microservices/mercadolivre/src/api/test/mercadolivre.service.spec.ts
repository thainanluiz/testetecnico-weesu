import { HttpService } from "@nestjs/axios";
import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Test, TestingModule } from "@nestjs/testing";
import { of, throwError } from "rxjs";
import { ProductSearchDto } from "src/products/dto/product-search.dto";
import { MercadoLivreService } from "../mercadolivre.service";

describe("MercadoLivreService", () => {
	let service: MercadoLivreService;
	let httpService: HttpService;

	// Categories mock data
	const mockCategoriesResponse = [{ id: "MLB5672", name: "Eletrônicos" }];

	// Products mock data
	const mockProductsResponse = {
		results: [
			{
				id: "MLB3822350769",
				title: "Smart Tv LG Led 65",
				price: 3269,
			},
		],
	};

	// DTO for product search
	const searchDto: ProductSearchDto = {
		term: "tv",
		categoryId: "MLB1051",
		orderBy: "price_asc",
	};

	// Mocked HttpService
	const httpServiceMock = {
		get: jest.fn(),
	};

	// Create the service and HttpService instances before each test
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MercadoLivreService,
				{ provide: HttpService, useValue: httpServiceMock },
			],
		}).compile();

		service = module.get<MercadoLivreService>(MercadoLivreService);
		httpService = module.get<HttpService>(HttpService);
	});

	// Test if the service is defined
	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	// Test if the HttpService is defined
	it("should be defined", () => {
		expect(httpService).toBeDefined();
	});

	// Test the getCategories method
	it("should get categories from Mercado Livre API", async () => {
		httpServiceMock.get.mockReturnValueOnce(
			of({ data: mockCategoriesResponse }),
		);

		const result = await service.getCategories();

		await expect(result).toEqual(mockCategoriesResponse);
		await expect(httpService.get).toHaveBeenCalledWith(
			expect.stringContaining("/categories"),
			expect.any(Object),
		);
	});

	// Test the getCategories method with empty categories
	it("should throw an error if the API fails", async () => {
		const rpcException = new RpcException({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: "Internal Server Error",
		});

		httpServiceMock.get.mockReturnValueOnce(throwError(() => rpcException));

		await expect(service.getCategories()).rejects.toThrow(RpcException);
	});

	// Test the searchProducts method
	it("should search products successfully", async () => {
		httpServiceMock.get.mockReturnValueOnce(of({ data: mockProductsResponse }));

		const result = await service.searchProducts(searchDto);

		await expect(result).toEqual(mockProductsResponse);
		await expect(httpService.get).toHaveBeenCalledWith(
			expect.stringContaining("/search"),
			expect.any(Object),
		);
	});

	// Test the searchProducts method with empty products
	it("should throw an error if the API fails", async () => {
		const rpcException = new RpcException({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: "Internal Server Error",
		});

		httpServiceMock.get.mockReturnValueOnce(throwError(() => rpcException));

		await expect(service.searchProducts(searchDto)).rejects.toThrow(
			RpcException,
		);
	});
});
