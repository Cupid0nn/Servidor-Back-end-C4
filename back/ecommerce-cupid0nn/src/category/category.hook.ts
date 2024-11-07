import { Module, OnModuleInit } from '@nestjs/common';
import { CategoryService } from './category.service';

@Module({
  providers: [CategoryService],
})
export class CategoryHook implements OnModuleInit {
  constructor(private readonly categoryService: CategoryService) {}

  async onModuleInit() {
   await this.categoryService.addCategories();
  
  }
}