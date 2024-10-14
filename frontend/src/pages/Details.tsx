import {
	Box,
	Container,
	Stack,
	Text,
	Image,
	Flex,
	Button,
	Heading,
	SimpleGrid,
	StackDivider,
	useColorModeValue,
	List,
	ListItem,
} from "@chakra-ui/react";
import { useProductContext } from "../context/product/productContext";
import { useNavigate } from "react-router-dom";

const Details: React.FC = () => {
	const { product, handleClearProduct } = useProductContext();
	const navigate = useNavigate();

	return (
		<Container maxW={"7xl"}>
			<SimpleGrid
				columns={{ base: 1, lg: 2 }}
				spacing={{ base: 8, md: 10 }}
				py={{ base: 18, md: 24 }}
			>
				<Flex>
					<Image
						rounded={"md"}
						alt={`Product ${product?.title}`}
						src={product?.thumbnail}
						fit={"cover"}
						align={"center"}
						w={"100%"}
						h={{ base: "100%", sm: "400px", lg: "500px" }}
					/>
				</Flex>

				<Stack spacing={{ base: 6, md: 10 }}>
					<Box as={"header"}>
						<Heading
							lineHeight={1.1}
							fontWeight={600}
							fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
						>
							{product?.title}
						</Heading>
						<Text
							color={useColorModeValue("gray.900", "gray.400")}
							fontWeight={300}
							fontSize={"xl"}
						>
							{product?.price.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
						</Text>
					</Box>

					<Stack
						spacing={{ base: 4, sm: 6 }}
						direction={"column"}
						divider={
							<StackDivider
								borderColor={useColorModeValue("gray.200", "gray.600")}
							/>
						}
					>
						<Box>
							<Text
								fontSize={"lg"}
								color={useColorModeValue("teal.500", "teal.300")}
								fontWeight={"500"}
								textTransform={"uppercase"}
								mb={"4"}
							>
								Detalhes
							</Text>

							<List spacing={2}>
								<ListItem>
									<Text as={"span"} fontWeight={"bold"}>
										Quantidade Disponível:
									</Text>{" "}
									{product?.available_quantity}
								</ListItem>
								<ListItem>
									<Text as={"span"} fontWeight={"bold"}>
										Condição:
									</Text>{" "}
									{product?.condition === "new" ? "Novo" : "Usado"}
								</ListItem>
								<ListItem>
									<Text as={"span"} fontWeight={"bold"}>
										Envio:
									</Text>{" "}
									{product?.free_shipping ? "Frete grátis" : "Frete pago"}
								</ListItem>
								<ListItem>
									<Text as={"span"} fontWeight={"bold"}>
										Vendido por:
									</Text>{" "}
									{product?.seller.official_store_name ||
										product?.seller.nickname}
								</ListItem>
								<ListItem>
									<Text as={"span"} fontWeight={"bold"}>
										Parcelamento:
									</Text>{" "}
									{product?.installments ? (
										<>
											{product.installments.quantity}{" "}
											{product.installments.amount.toLocaleString("pt-BR", {
												style: "currency",
												currency: "BRL",
											})}
										</>
									) : (
										<Text as={"span"} color="gray.500">
											Não disponível
										</Text>
									)}
								</ListItem>
							</List>
						</Box>
					</Stack>

					<Button
						colorScheme="teal"
						width="100%"
						size="lg"
						textTransform={"uppercase"}
						_hover={{
							transform: "translateY(2px)",
							boxShadow: "lg",
						}}
						onClick={() => {
							window.open(product?.permalink, "_blank");
						}}
					>
						Verificar no Mercado Livre
					</Button>
					<Button
						colorScheme="blue"
						width="100%"
						size="lg"
						textTransform={"uppercase"}
						_hover={{
							transform: "translateY(2px)",
							boxShadow: "lg",
						}}
						onClick={() => {
							handleClearProduct();
							navigate("/");
						}}
					>
						Voltar
					</Button>
				</Stack>
			</SimpleGrid>
		</Container>
	);
};

export default Details;
