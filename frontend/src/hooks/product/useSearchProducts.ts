import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SearchProductsResponse } from "../../interfaces/product/product-response";

const fetchProducts = async (
	term: string,
	category?: string,
	sort?: string,
): Promise<SearchProductsResponse> => {
	const { data } = await axios.get<SearchProductsResponse>(
		`${import.meta.env.VITE_API_PROTOCOL}://${import.meta.env.VITE_API_DOMAIN}:${import.meta.env.VITE_API_PORT}/${import.meta.env.VITE_API_PREFIX}/${import.meta.env.VITE_API_VERSION}/products/search`,
		{
			params: { term, categoryId: category, orderBy: sort },
		},
	);

	return data;
};

export const useSearchProductsHook = (
	term: string,
	category?: string,
	sort?: string,
) => {
	return useQuery({
		queryKey: ["products-search", term],
		queryFn: () => fetchProducts(term, category, sort),
		enabled: !!term,
		refetchInterval: import.meta.env.VITE_API_REFETCH_RATE,
	});
};
