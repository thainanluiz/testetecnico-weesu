import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProductSearchDto {
	@IsNotEmpty({ message: "The term must not be empty" })
	@IsString({ message: "The term must be a string" })
	term: string;

	@IsOptional()
	@IsString({ message: "The categoryId must be a string" })
	categoryId?: string;

	@IsOptional()
	@IsString({ message: "The orderBy must be a string" })
	orderBy?: string;
}
