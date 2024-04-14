import { Controller, FileTypeValidator, InternalServerErrorException, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';

@Controller('files')
export class FileUploadController {
    constructor(
        private readonly fileUploadService: FileUploadService
    ) {}
    @Put('uploadImage/:id')
    @UseInterceptors(FileInterceptor('image'))
   uploadImage( @Param('id', ParseUUIDPipe) id: string,@UploadedFile (
    new ParseFilePipe({
        validators:[
            new MaxFileSizeValidator({
                maxSize: 204800,
                message: 'Max file size is 200KB'
            }),
            new FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp)$/,
            })
        ]
    })
   ) file: Express.Multer.File) {
    if(!file) throw new InternalServerErrorException('Error in uploading image');
    return this.fileUploadService.uploadImage(file,id)
  }
}
