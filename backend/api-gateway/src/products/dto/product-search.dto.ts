import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProductSearchDto {
	@ApiProperty({
		name: "term",
		description: "The term to search for a product at Mercado Livre",
		required: true,
		type: "string",
		example: "monitor gamer 240zh",
		format: "string",
	})
	@IsNotEmpty({ message: "The term must not be empty" })
	@IsString({ message: "The term must be a string" })
	term: string;

	@ApiProperty({
		name: "categoryId",
		description: "The categoryId to search for a product at Mercado Livre",
		required: false,
		type: "string",
		example: "MLB1648 (Informática)",
		format: "string",
	})
	@IsOptional()
	@IsString({ message: "The categoryId must be a string" })
	categoryId?: string;

	@ApiProperty({
		name: "orderBy",
		description: "The order to search for a product at Mercado Livre",
		required: false,
		type: "string",
		example: "price_asc",
		format: "string",
	})
	@IsOptional()
	@IsString({ message: "The orderBy must be a string" })
	orderBy?: string;
}
