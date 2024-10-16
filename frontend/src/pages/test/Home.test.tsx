import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductProvider } from "../../context/product/productContext";
import Home from "../Home";

describe("Home Page", () => {
	// Create a new react query client
	const queryClient = new QueryClient();

	// Mock the useSearchProductsHook
	vi.mock("../../hooks/product/useSearchProducts", () => ({
		useSearchProductsHook: () => ({
			data: {
				products: [
					{
						id: "MLB4648757054",
						title: "Semp Led Smart Tv 32 R6610 Hd Roku Tv",
						price: 999,
						original_price: 1249,
						thumbnail:
							"http://http2.mlstatic.com/D_737120-MLU76102379323_042024-I.jpg",
						seller: {
							id: 480263032,
							nickname: "MERCADOLIVRE ELETRONICOS",
							official_store_name: "Mercado Livre",
						},
						available_quantity: 500,
						condition: "new",
						installments: {
							quantity: 10,
							amount: 99.9,
							rate: 0,
						},
						free_shipping: true,
						permalink:
							"https://www.mercadolivre.com.br/semp-led-smart-tv-32-r6610-hd-roku-tv/p/MLB36337459#wid=MLB4648757054&sid=unknown",
					},
				],
			},
			isLoading: false,
		}),
	}));

	// Render the Home page before each test
	beforeEach(() => {
		render(
			<QueryClientProvider client={queryClient}>
				<ChakraProvider>
					<ProductProvider>
						<MemoryRouter>
							<Home />
						</MemoryRouter>
					</ProductProvider>
				</ChakraProvider>
			</QueryClientProvider>,
		);
	});

	// Test if the Home page renders correctly
	it("should render Home page", () => {
		expect(screen.getByText("Busca de Produtos")).toBeDefined();
		expect(screen.getByPlaceholderText("Buscar produtos")).toBeDefined();
		expect(screen.getByText("Categoria do Produto")).toBeDefined();
		expect(screen.getByText("Ordenar por")).toBeDefined();
	});

	// Test if the Home page renders the products
	it("should render products", () => {
		expect(
			screen.getByText("Semp Led Smart Tv 32 R6610 Hd Roku Tv"),
		).toBeDefined();
		expect(screen.getByText("R$ 999,00")).toBeDefined();
		expect(screen.getByText("R$ 1.249,00")).toBeDefined();
		expect(screen.getByText("Ir para detalhes")).toBeDefined();
	});
});
