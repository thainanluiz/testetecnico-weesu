import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Test, TestingModule } from "@nestjs/testing";
import { MercadoLivreService } from "../../api/mercadolivre.service";
import { ProductSearchDto } from "../dto/product-search.dto";
import { ProductsService } from "../products.service";

describe("ProductsService", () => {
	let service: ProductsService;
	let mercadoLivreService: MercadoLivreService;

	// Products mock data
	const mockProductsData = {
		paging: { total: 1, primary_results: 1, offset: 0, limit: 50 },
		results: [
			{
				id: "MLB5017144176",
				title: "Smart Tv Led 32 Hd Samsung Ls32betblggxzd 2 Hdmi 1 Usb Preto",
				price: 1084.9,
				original_price: 1798.34,
				thumbnail:
					"http://http2.mlstatic.com/D_763352-MLU77595801805_072024-I.jpg",
				seller: {
					id: 1917068106,
					nickname: "VIKINGS_DIGITAL",
					official_store_name: "Vikings",
				},
				available_quantity: 500,
				condition: "new",
				installments: {
					quantity: 10,
					amount: 108.49,
					rate: 0,
				},
				free_shipping: true,
				permalink:
					"https://www.mercadolivre.com.br/smart-tv-led-32-hd-samsung-ls32betblggxzd-2-hdmi-1-usb-preto/p/MLB30999973#wid=MLB5017144176&sid=unknown",
			},
		],
	};

	// Mocked response data
	const mockProductsResponse = {
		products: [
			{
				id: "MLB5017144176",
				title: "Smart Tv Led 32 Hd Samsung Ls32betblggxzd 2 Hdmi 1 Usb Preto",
				price: 1084.9,
				original_price: 1798.34,
				thumbnail:
					"http://http2.mlstatic.com/D_763352-MLU77595801805_072024-I.jpg",
				seller: {
					id: 1917068106,
					nickname: "VIKINGS_DIGITAL",
					official_store_name: null,
				},
				available_quantity: 500,
				condition: "new",
				installments: {
					quantity: 10,
					amount: 108.49,
					rate: 0,
				},
				free_shipping: false,
				permalink:
					"https://www.mercadolivre.com.br/smart-tv-led-32-hd-samsung-ls32betblggxzd-2-hdmi-1-usb-preto/p/MLB30999973#wid=MLB5017144176&sid=unknown",
			},
		],
		total: 1,
	};

	// DTO for product search
	const searchDto: ProductSearchDto = {
		term: "tv",
		categoryId: "MLB1051",
		orderBy: "price_asc",
	};

	// Mocked MercadoLivreService
	const mercadoLivreServiceMock = {
		searchProducts: jest.fn().mockResolvedValue(mockProductsData),
	};

	// Create the service and MercadoLivreService instances before each test
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductsService,
				{ provide: MercadoLivreService, useValue: mercadoLivreServiceMock },
			],
		}).compile();

		service = module.get<ProductsService>(ProductsService);
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

	// Test the searchProducts method
	it("should search products successfully", async () => {
		const result = await service.searchProducts(searchDto);

		await expect(result).toEqual(mockProductsResponse);
		await expect(mercadoLivreServiceMock.searchProducts).toHaveBeenCalledWith(
			searchDto,
		);
	});

	// Test the searchProducts method with an empty response
	it("should throw an RpcException if the microservice fails", async () => {
		const rpcException = new RpcException({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: "Internal Server Error",
		});

		mercadoLivreServiceMock.searchProducts.mockRejectedValue(rpcException);

		await expect(service.searchProducts(searchDto)).rejects.toThrow(
			rpcException,
		);
	});
});
