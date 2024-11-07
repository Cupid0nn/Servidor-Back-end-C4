import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { cloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common/pipes';
import { AuthGuard } from 'src/Auth/Auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Cloudinary')
@ApiBearerAuth()
@Controller('files')
@UseGuards(AuthGuard)
export class CloudinaryController {
  constructor(private readonly cloudinaryService: cloudinaryService) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') productId: string,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 200000, message: 'the file is too big' }), //200kb
        new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif|webp|svg)$/i }),
      ]
    })) file: Express.Multer.File,
  ) {
    return this.cloudinaryService.uploadImage(productId, file);
  }
}
