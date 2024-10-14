import { Select, FormControl, FormLabel, InputGroup } from "@chakra-ui/react";

interface SearchSelectProps<T> {
	value: string;
	onChange: (value: string) => void;
	options: T[];
	getOptionValue: (option: T) => string;
	getOptionLabel: (option: T) => string;
	label?: string;
	placeholder?: string;
}

const SearchSelect = <T extends {}>({
	value,
	onChange,
	options,
	getOptionValue,
	getOptionLabel,
	label,
	placeholder,
}: SearchSelectProps<T>) => {
	return (
		<FormControl>
			{label && <FormLabel>{label}</FormLabel>}
			<InputGroup>
				<Select
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					variant="outline"
					borderColor="gray.300"
					focusBorderColor="blue.500"
					size="lg"
				>
					{options.map((option) => (
						<option key={getOptionValue(option)} value={getOptionValue(option)}>
							{getOptionLabel(option)}
						</option>
					))}
				</Select>
			</InputGroup>
		</FormControl>
	);
};

export default SearchSelect;
