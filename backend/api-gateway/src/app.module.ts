import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ProductsModule } from "./products/products.module";

@Module({
	imports: [ConfigModule.forRoot(), ProductsModule],
})
export class AppModule {}
