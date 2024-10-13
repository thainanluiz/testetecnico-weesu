import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SearchProductsResponse } from "../interfaces/product-response";

const fetchProducts = async (term: string): Promise<SearchProductsResponse> => {
	const { data } = await axios.get<SearchProductsResponse>(
		"http://localhost:3000/api/v1/products/search",
		{
			params: { term },
		},
	);

	return data;
};

export const useSearchProductsHook = (term: string) => {
	return useQuery({
		queryKey: ["products-search", term],
		queryFn: () => fetchProducts(term),
		enabled: !!term,
	});
};
