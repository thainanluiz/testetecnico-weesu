import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SearchCategoriesResponse } from "../interfaces/category/categories-response";

const fetchCategories = async (): Promise<SearchCategoriesResponse> => {
	const { data } = await axios.get<SearchCategoriesResponse>(
		"http://localhost:3000/api/v1/categories",
	);

	return data;
};

export const useSearchCategoriesHook = () => {
	return useQuery({
		queryKey: ["categories-search"],
		queryFn: () => fetchCategories(),
	});
};
