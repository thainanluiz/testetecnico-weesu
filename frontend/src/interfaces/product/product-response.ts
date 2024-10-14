import { Product } from "./product-data";

export interface SearchProductsResponse {
	products: Product[];
	total: number;
}
