import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SearchProductsResponse } from "../interfaces/product/product-response";

const fetchProducts = async (
	term: string,
	category?: string,
): Promise<SearchProductsResponse> => {
	const { data } = await axios.get<SearchProductsResponse>(
		"http://localhost:3000/api/v1/products/search",
		{
			params: { term, categoryId: category },
		},
	);

	return data;
};

export const useSearchProductsHook = (term: string, category?: string) => {
	return useQuery({
		queryKey: ["products-search", term],
		queryFn: () => fetchProducts(term, category),
		enabled: !!term,
	});
};
