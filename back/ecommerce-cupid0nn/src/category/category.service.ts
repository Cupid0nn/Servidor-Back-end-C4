import { CategoryRepository } from "./category.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ) { }

  addCategories() {
    return this.categoryRepository.addCategories();
  }

  getCategories() {
    return this.categoryRepository.getCategories();
  }
}