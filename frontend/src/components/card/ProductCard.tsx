import { Box, Image, Text, Badge, Flex, Stack, Button } from "@chakra-ui/react";
import { Product } from "../../interfaces/product-data";

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	return (
		<Box
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			bg="white"
			boxShadow="md"
			transition="all 0.3s ease"
			_hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
		>
			<Box position="relative">
				<Image
					src={product.thumbnail}
					alt={product.title}
					width="100%"
					height="200px"
					objectFit="cover"
				/>

				<Badge
					position="absolute"
					top={2}
					left={2}
					colorScheme={product.condition === "new" ? "green" : "orange"}
					fontSize="0.8em"
				>
					{product.condition === "new" ? "Novo" : "Usado"}
				</Badge>

				{product.free_shipping && (
					<Badge
						position="absolute"
						top={2}
						right={2}
						colorScheme="blue"
						fontSize="0.8em"
					>
						Frete grátis
					</Badge>
				)}
			</Box>

			<Box p={4}>
				<Stack spacing={3}>
					<Text fontWeight="bold" fontSize="lg" noOfLines={2} color="gray.700">
						{product.title}
					</Text>

					<Flex alignItems="center">
						<Text fontWeight="bold" fontSize="xl" color="teal.600">
							{new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "BRL",
							}).format(product.price)}
						</Text>
						{product.original_price && (
							<Text
								fontSize="sm"
								color="gray.500"
								ml={2}
								textDecoration="line-through"
							>
								{new Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL",
								}).format(product.original_price)}
							</Text>
						)}
					</Flex>

					<Text fontSize="sm" color="gray.600">
						Vendido por:{" "}
						{product.seller.official_store_name || product.seller.nickname}
					</Text>

					<Text fontSize="sm" color="gray.500">
						Disponibilidade: {product.available_quantity}
					</Text>

					{product.installments && (
						<Text fontSize="sm" color="gray.500">
							{product.installments.quantity}x de{" "}
							{new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "BRL",
							}).format(product.installments.amount)}{" "}
							{product.installments.rate > 0
								? `(com juros de ${product.installments.rate}%)`
								: "sem juros"}
						</Text>
					)}

					<Button colorScheme="teal" width="100%" size="md" mt={3}>
						Adicionar ao carrinho
					</Button>
				</Stack>
			</Box>
		</Box>
	);
};

export default ProductCard;
