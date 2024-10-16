import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SearchCategoriesResponse } from "../../interfaces/category/categories-response";

const fetchCategories = async (): Promise<SearchCategoriesResponse> => {
	const { data } = await axios.get<SearchCategoriesResponse>(
		`${import.meta.env.VITE_API_PROTOCOL}://${import.meta.env.VITE_API_DOMAIN}:${import.meta.env.VITE_API_PORT}/${import.meta.env.VITE_API_PREFIX}/${import.meta.env.VITE_API_VERSION}/categories`,
	);

	return data;
};

export const useSearchCategoriesHook = () => {
	return useQuery({
		queryKey: ["categories-search"],
		queryFn: () => fetchCategories(),
		refetchInterval: import.meta.env.VITE_API_REFETCH_RATE,
	});
};
