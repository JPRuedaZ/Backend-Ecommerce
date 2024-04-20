import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/Product.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class FileUploadService {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
        @InjectRepository(Product) private productsRepository: Repository<Product>
    ) {}
    async uploadImage(file: Express.Multer.File, id: string) {
        const product = await this.productsRepository.findOneBy({id});
        if(!product) throw new NotFoundException('Product not found');

        const uploadedImage = await this.cloudinaryService.uploadImage(file);

        await this.productsRepository.update(product.id, {imgUrl: uploadedImage.secure_url});
    
        const updatedProduct = await this.productsRepository.findOneBy({id});
        return updatedProduct;
    }
}
