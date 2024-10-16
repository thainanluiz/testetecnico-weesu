import {
	Box,
	Container,
	Heading,
	SimpleGrid,
	Spinner,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/card/ProductCard";
import SearchInput from "../components/input/SearchInput";
import SearchSelect from "../components/select/SearchSelect";
import { useProductContext } from "../context/product/productContext";
import { useSearchCategoriesHook } from "../hooks/category/useSearchCategories";
import { useSearchProductsHook } from "../hooks/product/useSearchProducts";

const Home: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
	const [selectedSort, setSelectedSort] = useState<string>("relevance");

	const sortOptions = [
		{ value: "relevance", label: "Mais relevantes" },
		{ value: "price_asc", label: "Menor preço" },
		{ value: "price_desc", label: "Maior preço" },
	];

	const { data: categories } = useSearchCategoriesHook();
	const { data, isLoading } = useSearchProductsHook(
		searchTerm || "",
		selectedCategory,
		selectedSort,
	);

	const { handleSetProduct } = useProductContext();
	const navigate = useNavigate();

	return (
		<Container maxW="full" p={10} centerContent>
			<Box textAlign="center" w="container.xl" rounded="md">
				<Heading as="h1" size="2xl" mb={8} color="teal.600">
					Busca de Produtos
				</Heading>

				<SearchInput onSearch={(value) => setSearchTerm(value)} />

				<Box mt={8} w="full">
					<SimpleGrid columns={2} spacing={8} mt={8} w="full">
						<SearchSelect
							value={selectedCategory}
							onChange={(value) => {
								setSelectedCategory(value);
							}}
							options={categories?.categories || []}
							getOptionValue={(option) => option.id}
							getOptionLabel={(option) => option.name}
							label="Categoria do Produto"
							placeholder="Todas as categorias"
						/>
						<SearchSelect
							value={selectedSort}
							onChange={(value) => {
								setSelectedSort(value);
							}}
							options={sortOptions}
							getOptionValue={(option) => option.value}
							getOptionLabel={(option) => option.label}
							label="Ordenar por"
						/>
					</SimpleGrid>
				</Box>

				<Box mt={10} w="full">
					{isLoading && (
						<Spinner
							thickness="4px"
							speed="0.65s"
							emptyColor="gray.200"
							color="teal.500"
							size="xl"
						/>
					)}

					{!isLoading && data?.products && data.products.length > 0 && (
						<SimpleGrid
							columns={{ sm: 1, md: 3, lg: 5 }}
							spacing={8}
							mt={8}
							w="full"
						>
							{data.products.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									onClick={(product) => {
										handleSetProduct(product);
										navigate("/details");
									}}
								/>
							))}
						</SimpleGrid>
					)}

					{!isLoading && data?.products?.length === 0 && (
						<Text fontSize="lg" color="gray.500">
							Nenhum produto encontrado.
						</Text>
					)}
				</Box>
			</Box>
		</Container>
	);
};

export default Home;
