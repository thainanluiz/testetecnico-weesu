import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
	ProductContext,
	useProductContext,
} from "../../context/product/productContext";
import Details from "../Details";
import { m } from "framer-motion";

describe("Details Page", () => {
	// Mock the product data
	const mockProduct = {
		id: "MLB4648757054",
		title: "Semp Led Smart Tv 32 R6610 Hd Roku Tv",
		price: 999,
		original_price: 1249,
		thumbnail: "http://http2.mlstatic.com/D_737120-MLU76102379323_042024-I.jpg",
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
	};

	// Create a new react query client
	const queryClient = new QueryClient();

	// Mock the ProductContext handleSetProduct and handleClearProduct
	const handleClearProduct = vi.fn();
	const handleSetProduct = vi.fn();

	// Render the Details page before each test
	beforeEach(() => {
		render(
			<QueryClientProvider client={queryClient}>
				<ChakraProvider>
					<ProductContext.Provider
						value={{
							product: mockProduct,
							handleSetProduct,
							handleClearProduct,
						}}
					>
						<MemoryRouter>
							<Details />
						</MemoryRouter>
					</ProductContext.Provider>
				</ChakraProvider>
			</QueryClientProvider>,
		);
	});

	// Test if the Details page is rendered correctly
	it("should render Details page", () => {
		expect(
			screen.getByText("Semp Led Smart Tv 32 R6610 Hd Roku Tv"),
		).toBeDefined();
		expect(screen.getByText("R$ 999,00")).toBeDefined();
		expect(screen.getByText("Detalhes")).toBeDefined();
	});

	// Test if Mercado Livre link is opened when clicking on 'Verificar no Mercado Livre'
	it("should open the product link when clicking on 'Verificar no Mercado Livre'", () => {
		const mockOpen = vi.fn();
		window.open = mockOpen;

		fireEvent.click(screen.getByText("Verificar no Mercado Livre"));

		expect(mockOpen).toHaveBeenCalledWith(mockProduct.permalink, "_blank");
	});

	// Test if the handleClearProduct is called when clicking on 'Voltar'
	it("should call handleClearProduct when clicking on 'Voltar'", () => {
		fireEvent.click(screen.getByText("Voltar"));

		expect(handleClearProduct).toHaveBeenCalled();
	});
});
