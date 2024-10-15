import { createContext, useContext, useState } from "react";
import { Product } from "../../interfaces/product/product-data";

export type ProductContextProps = {
	product: Product | null;
	handleSetProduct: (product: Product) => void;
	handleClearProduct: () => void;
};

const ProductContext = createContext<ProductContextProps>(
	{} as ProductContextProps,
);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
	const [product, setProduct] = useState<Product | null>(null);

	const handleSetProduct = (product: Product) => {
		setProduct(product);
	};

	const handleClearProduct = () => {
		setProduct(null);
	};

	return (
		<ProductContext.Provider
			value={{
				product,
				handleSetProduct,
				handleClearProduct,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

const useProductContext = () => {
	const context = useContext(ProductContext);

	return context;
};

export { ProductContext, ProductProvider, useProductContext };
