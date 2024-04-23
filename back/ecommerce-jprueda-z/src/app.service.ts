import { Injectable } from '@nestjs/common';
import { CategoriesService } from './modules/categories/categories.service';
import { ProductsRepository } from './modules/products/products.repository';

@Injectable()
export class AppService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsRepository: ProductsRepository
  ) {
    this.preLoadData();
  }
  
  async preLoadData(): Promise<void>{
    
    await this.categoriesService.addCategories(),
    await this.productsRepository.addProducts()
  }

  async reset(): Promise<void> {
    
    await this.productsRepository.reset(),
    await this.categoriesService.addCategories(),
    await this.productsRepository.addProducts()
  }
}