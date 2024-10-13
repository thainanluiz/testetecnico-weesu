import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ProductsModule } from "./products/products.module";
import { CategoriesModule } from './categories/categories.module';

@Module({
	imports: [ConfigModule.forRoot(), ProductsModule, CategoriesModule],
})
export class AppModule {}
