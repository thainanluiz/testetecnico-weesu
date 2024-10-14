import { ChakraProvider } from "@chakra-ui/react";
import { ProductProvider } from "./product/productContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Details from "../pages/Details";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/details",
		element: <Details />,
	},
]);

const queryClient = new QueryClient();

const AppProvider = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<ProductProvider>
					<RouterProvider router={router} />
				</ProductProvider>
			</ChakraProvider>
		</QueryClientProvider>
	);
};

export default AppProvider;
