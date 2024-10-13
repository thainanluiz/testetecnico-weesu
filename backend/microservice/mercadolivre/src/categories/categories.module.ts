import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
	imports: [HttpModule],
	controllers: [CategoriesController],
	providers: [CategoriesService],
})
export class CategoriesModule {}
