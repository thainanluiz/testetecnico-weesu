import { Module } from "@nestjs/common";
import { MercadoLivreModule } from "../api/mercadolivre.module";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";

@Module({
	imports: [MercadoLivreModule],
	controllers: [CategoriesController],
	providers: [CategoriesService],
})
export class CategoriesModule {}
