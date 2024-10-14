export interface Product {
	id: string;
	title: string;
	price: number;
	original_price?: number | null;
	thumbnail: string;
	seller: {
		id: number;
		nickname: string;
		official_store_name?: string | null;
	};
	available_quantity: number;
	condition: string;
	installments?: {
		quantity: number;
		amount: number;
		rate: number;
	} | null;
	free_shipping: boolean;
	permalink: string;
}
