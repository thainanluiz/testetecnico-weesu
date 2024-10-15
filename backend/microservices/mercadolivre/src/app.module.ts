import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CategoriesModule } from "./categories/categories.module";
import { ProductsModule } from "./products/products.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ProductsModule,
		CategoriesModule,
	],
})
export class AppModule {}
