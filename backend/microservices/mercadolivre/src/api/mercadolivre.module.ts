import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { MercadoLivreService } from "./mercadolivre.service";

@Module({
	imports: [HttpModule],
	providers: [MercadoLivreService],
	exports: [MercadoLivreService],
})
export class MercadoLivreModule {}
