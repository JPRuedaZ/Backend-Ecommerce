import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/Category';
import * as data from '../../utils/data.json';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) {}
    async addCategories () {
        data?.map(async (elem) => {
            await this.categoriesRepository.createQueryBuilder().insert().into(Category).values({name: elem.category}).orIgnore(`("name") DO NOTHING`).execute();
        })
        return 'Categories added successfully';
    }
}
