import { useState } from "react";
import {
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface SearchInputProps {
	onSearch: (term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			onSearch(searchTerm);
		}
	};

	return (
		<form onSubmit={handleSearch}>
			<InputGroup>
				<InputLeftElement pointerEvents="none">
					<SearchIcon color="gray.300" />
				</InputLeftElement>
				<Input
					type="text"
					placeholder="Buscar produtos"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					variant="outline"
					focusBorderColor="teal.500"
					bg="white"
					_placeholder={{ color: "gray.500" }}
				/>
				<InputRightElement>
					<IconButton
						aria-label="Buscar"
						icon={<SearchIcon />}
						type="submit"
						colorScheme="teal"
						size="md"
					/>
				</InputRightElement>
			</InputGroup>
		</form>
	);
};

export default SearchInput;
