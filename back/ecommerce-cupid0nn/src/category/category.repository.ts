import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "../Entityes/Category.Entity";
import { Repository } from "typeorm";
import * as data from '../../seed/products.json';


@Injectable()
export class CategoryRepository {
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepo: Repository<CategoryEntity>,
    ) {}

    async getCategories() {
        return await this.categoryRepo.find();
    }

    async addCategories() {
        try {
          await Promise.all(data.map(async (element) => {
            await this.categoryRepo
              .createQueryBuilder()
              .insert()
              .into(CategoryEntity)
              .values({ name: element.category })
              .orIgnore()  
              .execute();
          }));
          return 'Categories agregadas padree';
        } catch (error) {
          console.error(error);
          return 'Error al agregar categorías';
        }
      }
}