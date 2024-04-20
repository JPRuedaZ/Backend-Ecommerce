import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/Category.entity';
import * as data from '../../utils/data.json';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) {}
    async addCategories(): Promise<string> {
        await Promise.all(
            data?.map(async (product) => {
                await this.categoriesRepository
                  .createQueryBuilder()
                  .insert()
                  .into(Category)
                  .values({ name: product.category })
                  .orIgnore(`("name") DO NOTHING`)
                  .execute();
              }),
        )
        return 'Preloaded categories';
      }
}
