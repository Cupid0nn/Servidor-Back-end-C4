import { Controller, GatewayTimeoutException, Get } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}


  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }
}