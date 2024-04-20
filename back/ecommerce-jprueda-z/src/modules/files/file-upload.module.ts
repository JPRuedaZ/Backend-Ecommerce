import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryConfig, CloudinaryService]
})
export class FileUploadModule {}
