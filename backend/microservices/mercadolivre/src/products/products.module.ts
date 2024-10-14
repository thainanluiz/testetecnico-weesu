import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { MercadoLivreModule } from "src/api/mercadolivre.module";

@Module({
	imports: [MercadoLivreModule],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {}
