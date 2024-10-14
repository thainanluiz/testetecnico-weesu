import { useState } from "react";
import {
	Container,
	Box,
	Heading,
	Text,
	Spinner,
	SimpleGrid,
} from "@chakra-ui/react";
import SearchInput from "../components/input/SearchInput";
import SearchSelect from "../components/select/SearchSelect";
import { useSearchProductsHook } from "../hooks/useSearchProducts";
import { useSearchCategoriesHook } from "../hooks/useSearchCategories";
import ProductCard from "../components/card/ProductCard";

const Home: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

	const { data: categories } = useSearchCategoriesHook();

	const { data, isLoading, isError, error } = useSearchProductsHook(
		searchTerm || "",
		selectedCategory,
	);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
	};

	const handleSelect = (value: string) => {
		setSelectedCategory(value);
	};

	return (
		<Container maxW="full" p={10} centerContent>
			<Box textAlign="center" w="container.xl" rounded="md">
				<Heading as="h1" size="2xl" mb={8} color="teal.600">
					Busca de Produtos
				</Heading>

				<SearchInput onSearch={handleSearch} />

				<Box mt={8} w="full">
					<SearchSelect
						value={selectedCategory}
						onChange={handleSelect}
						options={categories?.categories || []}
						getOptionValue={(option) => option.id}
						getOptionLabel={(option) => option.name}
						label="Categoria do Produto"
					/>
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

					{isError && (
						<Text fontSize="lg" color="red.500">
							Erro:{" "}
							{error instanceof Error
								? error.message
								: "Erro ao buscar produtos"}
						</Text>
					)}

					{data?.products && data.products.length > 0 && (
						<SimpleGrid
							columns={{ sm: 1, md: 2, lg: 4 }}
							spacing={8}
							mt={8}
							w="full"
						>
							{data.products.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</SimpleGrid>
					)}

					{!isLoading && !isError && data?.products?.length === 0 && (
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
