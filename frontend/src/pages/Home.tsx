import { useState } from "react";
import { Container, Box, Heading, Text, Spinner } from "@chakra-ui/react";
import SearchInput from "../components/input/SearchInput";

const Home: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState<string | null>(null);

	const handleSearch = (term: string) => {
		setLoading(true);
		setResults(null);

		setTimeout(() => {
			setResults(`Resultados para: "${term}"`);
			setLoading(false);
		}, 1500);
	};

	return (
		<Container w="full" h="full" centerContent>
			<Box py={12} textAlign="center">
				<Heading as="h1" size="2xl" mb={8} color="teal.600">
					Busca de Produtos
				</Heading>

				<SearchInput onSearch={handleSearch} />

				<Box mt={10}>
					{loading ? (
						<Spinner
							thickness="4px"
							speed="0.65s"
							emptyColor="gray.200"
							color="teal.500"
							size="xl"
						/>
					) : results ? (
						<Text fontSize="2xl" fontWeight="bold" color="teal.600">
							{results}
						</Text>
					) : (
						<Text fontSize="lg" color="gray.500">
							Digite um termo para buscar produtos.
						</Text>
					)}
				</Box>
			</Box>
		</Container>
	);
};

export default Home;
