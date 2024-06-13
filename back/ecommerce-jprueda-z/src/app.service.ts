import { Injectable } from '@nestjs/common';
import { CategoriesService } from './modules/categories/categories.service';
import { ProductsRepository } from './modules/products/products.repository';
import { UsersService } from './modules/users/users.service';


@Injectable()
export class AppService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsRepository: ProductsRepository,
    private readonly usersService: UsersService
  ) {
    this.preLoadData();
  }
  
  async preLoadData(): Promise<void>{
    
    await this.categoriesService.addCategories();
    await this.productsRepository.addProducts();
    await this.usersService.preLoadUsers();
  }

  async reset(): Promise<void> {
    
    await this.productsRepository.reset(),
    await this.categoriesService.addCategories();
    await this.productsRepository.addProducts();
    await this.usersService.preLoadUsers();
  }
}