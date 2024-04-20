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
    await Promise.all([
    this.categoriesService.addCategories(),
    this.productsRepository.addProducts(),
    ])
    
  }

  async reset(): Promise<void> {
    await Promise.all([
    this.productsRepository.reset(),
    this.categoriesService.addCategories(),
    this.productsRepository.addProducts(),
    ]);
   
  console.log('Reinicio y se agrego Preloaded data');
  
  }
}