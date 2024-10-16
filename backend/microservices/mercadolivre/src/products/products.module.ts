import { Module } from "@nestjs/common";
import { MercadoLivreModule } from "../api/mercadolivre.module";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
	imports: [MercadoLivreModule],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {}
