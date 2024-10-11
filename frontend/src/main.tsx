import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";

import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
	</StrictMode>,
);
